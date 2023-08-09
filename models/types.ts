import { Types } from 'mongoose';

export interface ICity {
  _id: Types.ObjectId;
  name: string;
  isActive: boolean;
}

export interface IRoute extends ICity {
  cityId: Types.ObjectId;
}

export interface IPlace extends IRoute {
  aliases: string[];
}

export interface City {
  id: string;
  name: string;
  isActive?: boolean;
}

export interface Route {
  id: string;
  cityId: City['id'];
  name: string;
  isActive?: boolean;
}

export interface Place {
  id: number;
  cityId: City['id'];
  name: string;
  aliases: string[]; // violates 1NF
  isActive?: boolean;
}

export interface RouteStop {
  id: string;
  routeId: Route['id'];
  placeId: Place['id'];
  distance: number;
  isActive?: boolean;
}

export interface Path {
  routeId: Route['id'];
  path: [number, number][];
}
