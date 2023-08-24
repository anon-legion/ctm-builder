import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Place from '../models/Place';
import RouteStop from '../models/Route-Stop';
import errorObject from './utils/generic-error-object';

async function getPlacesAll(_: Request, res: Response) {
  try {
    const placeQuery = await Place.find({ isActive: true }, ['-__v']).sort({ name: 1 }).populate('cityId', 'name');
    res.status(StatusCodes.OK).send([...placeQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function postPlace(req: Request, res: Response) {
  const { cityId, name, aliases, isActive, type, coords } = req.body;

  try {
    const newPlace = await Place.create({ cityId, name, aliases, isActive, type, coords });
    const { _id } = newPlace;
    const placeQuery = await Place.findById(_id).select('-__v').populate('cityId', 'name');

    if (!placeQuery) {
      return res.status(StatusCodes.BAD_REQUEST).send(errorObject('Something went wrong, try again later', Place));
    }

    res.status(StatusCodes.CREATED).send({ ...placeQuery.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send(errorObject('Resource already exists', Place));
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', Place));
  }
}

async function getPlaceById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const placeQuery = await Place.findById(id).select('-__v');

    if (!placeQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Place with id "${id}" not found`, Place));
    }

    res.status(StatusCodes.OK).send({ ...placeQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', Place));
  }
}

async function putPlaceById(req: Request, res: Response) {
  const { id } = req.params;
  const { cityId, name, aliases, isActive, type, coords } = req.body;

  try {
    const placeQuery = await Place.findByIdAndUpdate(
      id,
      { cityId, name, aliases, isActive, type, coords },
      { new: true }
    )
      .populate('cityId', 'name')
      .select('-__v');

    if (!placeQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Place with id "${id}" not found`, Place));
    }

    if (!isActive) {
      await RouteStop.updateMany({ placeId: id }, { isActive: false });
    }

    res.status(StatusCodes.OK).send({ ...placeQuery.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send(errorObject('Resource already exists', Place));
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', Place));
  }
}

async function deletePlaceById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const [placeQuery, routeStopQuery] = await Promise.all([
      Place.findByIdAndUpdate(id, { isActive: false }, { returnDocument: 'after' }).select('-__v'),
      RouteStop.updateMany({ placeId: id }, { isActive: false }),
    ]);

    if (!placeQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Place with id "${id}" not found`, Place));
    }

    res.status(StatusCodes.OK).send({ ...placeQuery.toObject(), affectedRoueStops: routeStopQuery.modifiedCount });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', Place));
  }
}

async function getPlacesByCityId(req: Request, res: Response) {
  const { id: cityId } = req.params;

  try {
    const placeQuery = await Place.find({ cityId, isActive: true })
      .select('-__v')
      .sort({ name: 1 })
      .populate('cityId', 'name');

    res.status(StatusCodes.OK).send([...placeQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

export { getPlacesAll, postPlace, getPlaceById, putPlaceById, deletePlaceById, getPlacesByCityId };
