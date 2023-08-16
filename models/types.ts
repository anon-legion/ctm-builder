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

export interface IRouteStop {
  _id: Types.ObjectId;
  routeId: IRoute['_id'];
  placeId: IPlace['_id'];
  distance: number;
  isActive: boolean;
}

export interface IPath {
  routeId: IRoute['_id'];
  path: [number, number][];
}
