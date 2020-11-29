/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import * as ws from "ws";
import * as http from "http";
import fetch from "node-fetch";

import logger from "../logging";
import { StateData } from "../types/dto";
import State from "../state";
import PBEvent from "../types/events/PBEvent";
import NewStateEvent from "../types/events/NewStateEvent";
import HeartbeatEvent from "../types/events/HeartbeatEvent";
import ChampSelectStartedEvent from "../types/events/ChampSelectStartedEvent";
import ChampSelectEndedEvent from "../types/events/ChampSelectEndedEvent";
import NewActionEvent from "../types/events/NewActionEvent";
import { IngameEvent } from "../ingame/events/IngameEvent";
import { IngameState } from "../ingame/dto/IngameState";
import TickManager from "../TickManager";
import { IngameHeartbeatEvent } from "../ingame/events/IngameHeartbeatEvent";

const log = logger("websocket");

class WebSocketServer {
  server: ws.Server;
  state: State;
  ingameState: IngameState;
  clients: Array<WebSocket> = [];
  exampleClients: Array<WebSocket> = [];
  heartbeatInterval?: NodeJS.Timeout;
  config: any;

  constructor(server: http.Server, state: State, ingameState: IngameState) {
    this.server = new ws.Server({ server });
    this.state = state;
    this.ingameState = ingameState;


    this.sendHeartbeat = this.sendHeartbeat.bind(this);
    this.sendIngameHeartbeat = this.sendIngameHeartbeat.bind(this);

    // Event listeners
    this.server.on("connection", (socket: WebSocket, request) =>
      this.handleConnection(socket, request)
    );

    state.on("stateUpdate", (newState: StateData) => {
      newState.config = this.config;
      this.sendEvent(new NewStateEvent(newState));
    });
    state.on("champSelectStarted", () =>
      this.sendEvent(new ChampSelectStartedEvent())
    );
    state.on("champSelectEnded", () =>
      this.sendEvent(new ChampSelectEndedEvent())
    );
    state.on("newAction", (action) => {
      this.sendEvent(new NewActionEvent(action));
    });

    //Ingame Event listeners

    ingameState.on("pause", (pauseEvent) => {
      this.sendIngameEvent(pauseEvent);
    })

    ingameState.on("unpause", (unpauseEvent) => {
      this.sendIngameEvent(unpauseEvent);
    })
    
    ingameState.on("game_over", (gameOverEvent) => {
      this.sendIngameEvent(gameOverEvent);
    });

    ingameState.on("game_start", (gameStartEvent) => {
      this.sendIngameEvent(gameStartEvent);
    });
  }

  startHeartbeat(): void {
    this.heartbeatInterval = setInterval(this.sendHeartbeat, 10000);
  }

  stopHeartbeat(): void {
    if (!this.heartbeatInterval !== undefined) {
      clearInterval(this.heartbeatInterval as NodeJS.Timeout);
      this.heartbeatInterval = undefined;
    }
  }

  startIngameHeartbeat(): void {
    this.heartbeatInterval = setInterval(this.sendIngameHeartbeat, 1000 / TickManager.tickRate);
  }

  stopIngameHeartbeat(): void {
    if (this.heartbeatInterval !== undefined) {
      clearInterval(this.heartbeatInterval as NodeJS.Timeout);
      this.heartbeatInterval = undefined;
    }
  }

  handleConnection(socket: WebSocket, request: http.IncomingMessage): void {
    this.clients.push(socket);
    socket.send(JSON.stringify(new NewStateEvent(this.state.data)));
  }

  sendEvent(event: PBEvent): void {
    const serializedEvent = JSON.stringify(event);
    log.debug(`New Event: ${serializedEvent}`);

    this.clients.forEach((client: WebSocket) => {
      client.send(serializedEvent);
    });
  }

  sendIngameEvent(event: IngameEvent): void {
    const serializedEvent = JSON.stringify(event);

    this.clients.forEach((client: WebSocket) => {
      client.send(serializedEvent);
    });
  }

  sendHeartbeat(): void {
    this.api("https://stream-api.munich-esports.de/config.json").then(res => {
      this.config = res;
      const heartbeatEvent = new HeartbeatEvent(this.config);
      const heartbeatSerialized = JSON.stringify(heartbeatEvent);

      this.clients.forEach((client: WebSocket) => {
        client.send(heartbeatSerialized);
      });
    })

  }

  sendIngameHeartbeat(): void {
    const ingameHeartbeat = new IngameHeartbeatEvent(this.ingameState.stateData);
    const ingameHeartbeatSerialized = JSON.stringify(ingameHeartbeat);

    this.clients.forEach((client: WebSocket) => {
      client.send(ingameHeartbeatSerialized);
    });
  }

  async api(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<any>;
  }

}

export default WebSocketServer;