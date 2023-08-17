import { Schema, model } from 'mongoose';
import BusRoute from './Bus-Route';
import Place from './Place';
import { IRouteStop } from './types';
import { InvalidIdError } from '../errors';

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

// add model pre hook to check if routeId and placeId are valid
// also check if routeId.cityId === placeId.cityId
routeStopSchema.pre<IRouteStop>('save', async function (next) {
  try {
    const [busRoute, place] = await Promise.all([BusRoute.findById(this.routeId), Place.findById(this.placeId)]);

    if (!busRoute || !place) {
      throw new InvalidIdError('Invalid routeId or placeId');
    }

    if (busRoute.cityId.toString() !== place.cityId.toString()) {
      throw new InvalidIdError('BusRoute and Place cityId conflict');
    }

    next();
  } catch (err: any) {
    next(err);
  }
});

const RouteStop = model<IRouteStop>('Route-Stop', routeStopSchema);

export default RouteStop;
