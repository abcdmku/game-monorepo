import { Namespace, Socket as sSocket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface User {
  name: string
}

export interface Message {
  name: User['name'];
  message: string;
}

export type Game = Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type ServerSocket = sSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
