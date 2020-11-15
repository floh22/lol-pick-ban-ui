/* eslint-disable @typescript-eslint/no-use-before-define */
import express from 'express';
import http from 'http';

import WebSocketServer from './websocket';
import logger, { setLogLevel } from './logging';
import TickManager from './TickManager';
import { AddressInfo } from 'net';
import State from './state';
import { getDataProvider } from './data/DataProviderService';
import minimist from 'minimist';
import DataDragon from './data/league/datadragon';
import Controller from './state/controller';
import GlobalContext from './GlobalContext';
import './Console';

import IngameController from './state/IngameController';
import IngameDataProviderService from './data/league/IngameDataProviderService';

const argv = minimist(process.argv.slice(2));

// Needs to be done before logging is initialized, in order to set log level correctly
GlobalContext.commandLine = {
  data: argv['data'],
  record: argv['record'],
  leaguePath: argv['leaguePath'] || '',
  experimentalConnector: argv['experimentalConnector'],
  debug: argv['debug'],
};
if (GlobalContext.commandLine.debug) {
  setLogLevel('debug');
}

const log = logger('main');
const app = express();

log.info('  _          _       ____  ___   ____    _   _ ___ ');
log.info(' | |    ___ | |     |  _ \\( _ ) | __ )  | | | |_ _|');
log.info(' | |   / _ \\| |     | |_) / _ \\/\\  _ \\  | | | || | ');
log.info(' | |__| (_) | |___  |  __/ (_>  < |_) | | |_| || | ');
log.info(' |_____\\___/|_____| |_|   \\___/\\/____/   \\___/|___|');
log.info('                                                   ');

log.debug('Logging in debug mode!');
log.info('Configuration: ' + JSON.stringify(GlobalContext.commandLine));

const swapToIngame = (): void => {
  tickManager.tickable = ingameController;
};
const swapToChampSelect = (): void => {
  tickManager.tickable = controller;
};
const state = new State();
const ddragon = new DataDragon(state);
const dataProvider = getDataProvider();
const controller = new Controller({ dataProvider, state, ddragon, swapToIngame });
const ingameController = new IngameController({ dataProvider:new IngameDataProviderService(), ddragon, swapToChampSelect });
const tickManager = new TickManager({ tickable:controller });

const main = async (): Promise<void> => {
  await ddragon.init();

  const server = http.createServer(app);
  app.use('/cache', express.static(__dirname + '/../cache'));
  const wsServer = new WebSocketServer(server, state, ingameController);
  wsServer.startHeartbeat();

  tickManager.startLoop();

  server.listen(process.env.PORT || 8999, () => {
    if (server.address() === null) {
      return log.error('Failed to start server.');
    }
    const serverAddress = server.address() as AddressInfo;
    return log.info(`Server started on ${JSON.stringify(serverAddress)}`);
  });
};

main().then();
