import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

import { Document, Error as MongooseError } from 'mongoose';

citySchema.post('save', function (error: MongooseError, doc: Document, next: (err?: MongooseError) => void) {
  if (error.name === 'MongoError' && error.message.includes('11000')) {
    next(new Error('City name must be unique'));
  } else {
    next(error);
  }
});

const City = mongoose.model('City', citySchema);

export default City;
