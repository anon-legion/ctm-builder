import { Schema, model, Document, Error as MongooseError } from 'mongoose';
import { IPlace } from './types';

const placeSchema = new Schema<IPlace>({
  cityId: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  aliases: {
    type: [String],
    required: true,
    default: [],
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

placeSchema.post('save', function (error: MongooseError, _doc: Document, next: (err?: MongooseError) => void) {
  if (error.name === 'MongoError' && error.message.includes('11000')) {
    return next(new Error('City name must be unique'));
  } else {
    return next(error);
  }
});

const Place = model<IPlace>('Place', placeSchema);

export default Place;
