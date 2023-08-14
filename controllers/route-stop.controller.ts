import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RouteStop from '../models/Route-Stop';
import errorObject from './utils/generic-error-object';
import { InvalidDocumentIdError } from '../errors';

async function getRouteStopsAll(_: Request, res: Response) {
  try {
    const routeStopQuery = await RouteStop.find({}, ['-__v'])
      .sort({ name: 1 })
      .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });
    res.status(StatusCodes.OK).send([...routeStopQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function postRouteStop(req: Request, res: Response) {
  const { routeId, placeId, distance, isActive } = req.body;
  try {
    const newRouteStop = await RouteStop.create({ routeId, placeId, distance, isActive });
    res.status(StatusCodes.CREATED).send({ ...newRouteStop.toObject() });
  } catch (err: any) {
    if (err instanceof InvalidDocumentIdError) {
      return res.status(err.statusCode).send(errorObject(`${err.message}`, RouteStop));
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', RouteStop));
  }
}

async function getRouteStopById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const routeStopQuery = await RouteStop.findById(id, ['-__v']);
    if (!routeStopQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Route stop with id "${id}" not found`, RouteStop));
    }
    res.status(StatusCodes.OK).send({ ...routeStopQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal Server Error', RouteStop));
  }
}

async function putRouteStopById(req: Request, res: Response) {
  const { id } = req.params;
  const { routeId, placeId, distance, isActive } = req.body;
  try {
    const routeStopQuery = await RouteStop.findByIdAndUpdate(
      id,
      { routeId, placeId, distance, isActive },
      { new: true }
    ).select('-__v');
    if (!routeStopQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Route stop with id "${id}" not found`, RouteStop));
    }
    res.status(StatusCodes.OK).send({ ...routeStopQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal Server Error', RouteStop));
  }
}

async function getRouteStopsByRouteId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const routeStopQuery = await RouteStop.find({ routeId: id }, ['-__v'])
      .sort({ distance: 1 })
      .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });
    if (!routeStopQuery) {
      return res.status(StatusCodes.NOT_FOUND).send([]);
    }
    res.status(StatusCodes.OK).send([...routeStopQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function deleteRouteStopById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const routeStopQuery = await RouteStop.findByIdAndDelete(id).select('-__v');
    if (!routeStopQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Route stop with id "${id}" not found`, RouteStop));
    }
    res.status(StatusCodes.OK).send({ ...routeStopQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal Server Error', RouteStop));
  }
}

export {
  getRouteStopsAll,
  postRouteStop,
  getRouteStopById,
  putRouteStopById,
  getRouteStopsByRouteId,
  deleteRouteStopById,
};
