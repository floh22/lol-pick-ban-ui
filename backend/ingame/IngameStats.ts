export class IngameStats {
    gameMode: string;
    gameTime: number;
    mapName: string;
    mapNumber: number;
    mapTerrain: string;

    constructor(gameMode: string,
        gameTime: number,
        mapName: string,
        mapNumber: number,
        mapTerrain: string,) {
            this.gameTime = gameTime;
            this.gameMode = gameMode;
            this.mapName = mapName;
            this.mapNumber = mapNumber;
            this.mapTerrain = mapTerrain;

    }
}