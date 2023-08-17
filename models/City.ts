import { Schema, model, Document, Error as MongooseError } from 'mongoose';
import { ICity } from './types';

const citySchema = new Schema<ICity>({
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

citySchema.post('save', function (error: MongooseError, _doc: Document, next: (err?: MongooseError) => void) {
  if (error.name === 'MongoError' && error.message.includes('11000')) {
    return next(new Error('City name must be unique'));
  } else {
    return next(error);
  }
});

const City = model<ICity>('City', citySchema);

export default City;
