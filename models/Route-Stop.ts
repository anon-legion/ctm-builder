import { Schema, model, Document, Error as MongooseError } from 'mongoose';
import { IRouteStop } from './types';

const routeStopSchema = new Schema<IRouteStop>({
  routeId: {
    type: Schema.Types.ObjectId,
    ref: 'Bus-Route',
    required: true,
  },
  placeId: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  distance: {
    type: Number,
    required: true,
    default: 0,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const RouteStop = model<IRouteStop>('Route-Stop', routeStopSchema);

export default RouteStop;
