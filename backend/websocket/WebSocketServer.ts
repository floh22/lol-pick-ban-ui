/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable quotes */
import * as ws from "ws";
import * as fs from "fs";
import * as http from "http";

import logger from "../logging";
import { StateData } from "../types/dto";
import State from "../state";
import PBEvent from "../types/events/PBEvent";
import NewStateEvent from "../types/events/NewStateEvent";
import HeartbeatEvent from "../types/events/HeartbeatEvent";
import ChampSelectStartedEvent from "../types/events/ChampSelectStartedEvent";
import ChampSelectEndedEvent from "../types/events/ChampSelectEndedEvent";
import NewActionEvent from "../types/events/NewActionEvent";
import { IngameEvent } from "../types/ingame/events/IngameEvent";
import IngameController from "../state/IngameController";
import { GameUnpauseEvent } from "../types/ingame/events/GameUnpauseEvent";

const log = logger("websocket");
const fetch = require("node-fetch");

class WebSocketServer {
  server: ws.Server;
  state: State;
  ingameState: IngameController;
  clients: Array<WebSocket> = [];
  exampleClients: Array<WebSocket> = [];
  heartbeatInterval?: NodeJS.Timeout;
  config: any;

  constructor(server: http.Server, state: State, ingameState: IngameController) {
    this.server = new ws.Server({ server });
    this.state = state;
    this.ingameState = ingameState;
    
    this.sendHeartbeat = this.sendHeartbeat.bind(this);

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

    ingameState.on("ingame_event", (ingameEvent) => {
      this.sendIngameEvent(ingameEvent);
    })
  }

  startHeartbeat(): void {
    this.heartbeatInterval = setInterval(this.sendHeartbeat, 10000);
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
    log.info(`New Event: ${serializedEvent}`);

    this.clients.forEach((client: WebSocket) => {
      client.send(serializedEvent);
    });
  }

  sendHeartbeat(): void {
    //this.config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
    this.api("https://stream-api.munich-esports.de/config.json").then(res => {
      this.config = res;
      const heartbeatEvent = new HeartbeatEvent(this.config);
      const heartbeatSerialized = JSON.stringify(heartbeatEvent);

      this.clients.forEach((client: WebSocket) => {
        client.send(heartbeatSerialized);
      });
    })

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