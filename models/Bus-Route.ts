import { Schema, model, Document, Error as MongooseError } from 'mongoose';
import { IRoute } from './types';

const routeSchema = new Schema<IRoute>({
  cityId: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

routeSchema.post('save', function (error: MongooseError, _doc: Document, next: (err?: MongooseError) => void) {
  if (error.name === 'MongoError' && error.message.includes('11000')) {
    return next(new Error('City name must be unique'));
  } else {
    return next(error);
  }
});

const BusRoute = model<IRoute>('Bus-Route', routeSchema);

export default BusRoute;
