import needle, { NeedleResponse } from 'needle';

import logger from '../../logging';
import { EventEmitter } from 'events';
import DataProviderService from '../DataProviderService';
import GlobalContext from '../../GlobalContext';
import Connector, {
    ConnectionInfo,
    LibraryConnector,
    ExperimentalConnector,
} from './connector';
import { CurrentIngameState } from '../CurrentIngameState';
import { IngameSession } from '../../types/ingame/IngameSession';
import { Session, Summoner } from '../../types/lcu';
const log = logger('IngameDataProviderService');

class IngameDataProviderService extends EventEmitter
    implements DataProviderService {
    connector: Connector;
    connectionInfo!: ConnectionInfo;

    requestConfig = {
        json: true,
        rejectUnauthorized: false,
        username: '',
        password: '',
    };

    constructor() {
        super();

        if (GlobalContext.commandLine.experimentalConnector) {
            this.connector = new ExperimentalConnector({
                leaguePath: GlobalContext.commandLine.leaguePath,
            });
        } else {
            this.connector = new LibraryConnector({
                leaguePath: GlobalContext.commandLine.leaguePath,
            });
        }

        this.onLeagueConnected = this.onLeagueConnected.bind(this);
        this.onLeagueDisconnected = this.onLeagueDisconnected.bind(this);
        this.getCurrentData = this.getCurrentData.bind(this);

        this.connector.on('connect', this.onLeagueConnected);
        this.connector.on('disconnect', this.onLeagueDisconnected);

        if (GlobalContext.commandLine.leaguePath === '') {
            log.info('Trying to detect league installation automatically.');
        } else {
            log.info(
                'Using manually configured league installation: ' +
                GlobalContext.commandLine.leaguePath
            );
        }

        this.connector.start();
        log.info('Waiting for LeagueClient to connect');
    }

    async getCurrentData(): Promise<CurrentIngameState> {
        if (!this.connectionInfo) {
            log.debug('Not connected to LCU, but tried to get data.');
        }
        const response = await needle(
            'get',
            'https://127.0.0.1:2999/liveclientdata/eventdata',
            this.requestConfig
        );

        const responseGameStats = await needle(
            'get',
            'https://127.0.0.1:2999/liveclientdata/gamestats',
            this.requestConfig
        );
        const currentState = new CurrentIngameState(new IngameSession(response.body.Events), responseGameStats.body);
        return currentState;
    }

    onLeagueConnected(e: ConnectionInfo): void {
        log.info('LeagueClient connected');
        this.connectionInfo = e;
        this.requestConfig.username = this.connectionInfo.username;
        this.requestConfig.password = this.connectionInfo.password;

        this.emit('connected');
    }

    onLeagueDisconnected(): void {
        log.info('LeagueClient disconnected');

        this.emit('disconnected');
    }

    cacheSummoners(session: Session): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getSummonerById(id: number): Summoner {
        throw new Error('Method not implemented.');
    }

    pingIngame(): Promise<boolean> {
        throw new Error('Please never let this be called');
    }
}

export default IngameDataProviderService;
