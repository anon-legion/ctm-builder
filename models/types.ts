import { Types } from 'mongoose';

interface IBase {
  _id: Types.ObjectId;
  name: string;
  isActive: boolean;
}

export interface ICity extends IBase {
  code: string;
  center?: [number, number] | null;
  zoom?: number | null;
}

export interface IRoute extends IBase {
  cityId: ICity['_id'];
  weight?: number;
  isSymmetric?: boolean;
  hasPath?: boolean;
}

export interface IPlace extends IBase {
  cityId: ICity['_id'];
  aliases: string[];
  type?: string | null;
  coords?: [number, number] | null;
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
