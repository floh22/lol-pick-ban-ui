import { IngameStateData } from '../dto/IngameStateData';

export class IngameHeartbeatEvent {
    eventType = 'ingame_heartbeat';
    ingameStateData: IngameStateData;

    constructor(ingameStateData: IngameStateData) {
        this.ingameStateData = ingameStateData;
    }
}