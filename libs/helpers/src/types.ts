import { Namespace, Server, Socket as sSocket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface User {
  name: string;
  id?: string;
  token?: string;
}

export interface Message {
  name: User['name'];
  message: string;
}

export type Game = Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type ServerSocket = sSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
export type ServerIO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
