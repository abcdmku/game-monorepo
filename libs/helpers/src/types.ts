import { Namespace, Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface User {
  name: string;
  id?: string;
  token?: string;
}

export interface Message {
  room: string;
  name: User['name'];
  message: string;
}

export type Game = Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type ServerSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
export type ServerIO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
