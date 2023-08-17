import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RouteStop from '../models/Route-Stop';
import errorObject from './utils/generic-error-object';
import { InvalidIdError } from '../errors';

async function getRouteStopsAll(_: Request, res: Response) {
  try {
    const routeStopQuery = await RouteStop.find({ isActive: true }, ['-__v'])
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
    const { _id } = newRouteStop;
    const routeStopQuery = await RouteStop.findById(_id, ['-__v']).populate({
      path: 'placeId',
      select: 'name',
      populate: { path: 'cityId', select: 'name' },
    });

    if (!routeStopQuery) {
      return res.status(StatusCodes.BAD_REQUEST).send(errorObject('Something went wrong, try again later', RouteStop));
    }

    res.status(StatusCodes.CREATED).send({ ...routeStopQuery.toObject() });
  } catch (err: any) {
    if (err instanceof InvalidIdError) {
      return res.status(err.statusCode).send(errorObject(`${err.message}`, RouteStop));
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', RouteStop));
  }
}

async function getRouteStopById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const routeStopQuery = await RouteStop.findById(id, ['-__v']).populate({
      path: 'placeId',
      select: 'name',
      populate: { path: 'cityId', select: 'name' },
    });

    if (!routeStopQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Route stop with id "${id}" not found`, RouteStop));
    }

    res.status(StatusCodes.OK).send({ ...routeStopQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal Server Error', RouteStop));
  }
}

// validate update if routeId.cityId._id === placeId.cityId._id
async function putRouteStopById(req: Request, res: Response) {
  const { id } = req.params;
  const { routeId, placeId, distance, isActive } = req.body;

  try {
    const routeStopQuery = await RouteStop.findByIdAndUpdate(
      id,
      { routeId, placeId, distance, isActive },
      { new: true }
    )
      .select('-__v')
      .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });

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
    const routeStopQuery = await RouteStop.find({ routeId: id, isActive: true }, ['-__v'])
      .sort({ distance: 1 })
      .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });
    res.status(StatusCodes.OK).send([...routeStopQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function deleteRouteStopById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // const routeStopQuery = await RouteStop.findByIdAndDelete(id)
    //   .select('-__v')
    //   .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });
    const routeStopQuery = await RouteStop.findByIdAndUpdate(
      id,
      { isActive: false },
      { returnDocument: 'after' }
    ).select('-__v');

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
