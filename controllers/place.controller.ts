import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Place from '../models/Place';
import errorObject from './utils/generic-error-object';

async function getPlacesAll(_: Request, res: Response) {
  try {
    const placeQuery = await Place.find({}, ['-__v']).sort({ name: 1 }).populate('cityId', 'name');
    res.status(StatusCodes.OK).send([...placeQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function postPlace(req: Request, res: Response) {
  const { cityId, name, aliases, isActive } = req.body;
  try {
    const newPlace = await (await Place.create({ cityId, name, aliases, isActive })).populate('cityId', 'name');
    res.status(StatusCodes.CREATED).send({ ...newPlace.toObject() });
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
  const { cityId, name, aliases, isActive } = req.body;
  try {
    const placeQuery = await Place.findByIdAndUpdate(id, { cityId, name, aliases, isActive }, { new: true })
      .populate('cityId', 'name')
      .select('-__v');
    if (!placeQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Place with id "${id}" not found`, Place));
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
    const placeQuery = await Place.findByIdAndDelete(id).select('-__v');
    if (!placeQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Place with id "${id}" not found`, Place));
    }
    res.status(StatusCodes.OK).send({ ...placeQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', Place));
  }
}

async function getPlaceByCityId(req: Request, res: Response) {
  const { id: cityId } = req.params;
  try {
    const placeQuery = await Place.find({ cityId }).select('-__v').sort({ name: 1 }).populate('cityId', 'name');
    if (!placeQuery.length) {
      return res.status(StatusCodes.NOT_FOUND).send([]);
    }
    res.status(StatusCodes.OK).send([...placeQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

export { getPlacesAll, postPlace, getPlaceById, putPlaceById, deletePlaceById, getPlaceByCityId };
