import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BusRoute from '../models/Bus-Route';
import RouteStop from '../models/Route-Stop';
import errorObject from './utils/generic-error-object';

async function getBusRoutesAll(_: Request, res: Response) {
  try {
    const busRouteQuery = await BusRoute.find({ isActive: true }, ['-__v'])
      .sort({ name: 1 })
      .populate('cityId', 'name');
    res.status(StatusCodes.OK).send([...busRouteQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function postBusRoute(req: Request, res: Response) {
  const { cityId, name, isActive } = req.body;

  try {
    const busRouteQuery = await (await BusRoute.create({ cityId, name, isActive })).populate('cityId', 'name');
    res.status(StatusCodes.CREATED).send({ ...busRouteQuery.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send(errorObject('Resource already exists', BusRoute));
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', BusRoute));
  }
}

async function getBusRouteById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const busRouteQuery = await BusRoute.findById(id).select('-__v');

    if (!busRouteQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Bus route with id "${id}" not found`, BusRoute));
    }

    res.status(StatusCodes.OK).send({ ...busRouteQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', BusRoute));
  }
}

async function getBusRoutesByCityId(req: Request, res: Response) {
  const { id: cityId } = req.params;

  try {
    const busRouteQuery = await BusRoute.find({ cityId, isActive: true }, ['-__v'])
      .sort({ name: 1 })
      .populate('cityId', 'name');
    res.status(StatusCodes.OK).send([...busRouteQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function putBusRouteById(req: Request, res: Response) {
  const { id } = req.params;
  const { cityId, name, isActive } = req.body;

  try {
    const busRouteQuery = await BusRoute.findByIdAndUpdate(id, { cityId, name, isActive }, { new: true })
      .populate('cityId', 'name')
      .select('-__v');

    if (!busRouteQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Bus route with id "${id} not found`, BusRoute));
    }

    if (!isActive) {
      await RouteStop.updateMany({ routeId: id }, { isActive: false });
    }

    res.status(StatusCodes.OK).send({ ...busRouteQuery.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send(errorObject('Resource already exists', BusRoute));
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', BusRoute));
  }
}

async function deleteBusRouteById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // const busRouteQuery = await BusRoute.findByIdAndDelete(id).select('-__v');
    const [busRouteQuery, routeStopQuery] = await Promise.all([
      BusRoute.findByIdAndUpdate(id, { isActive: false }, { returnDocument: 'after' }).select('-__v'),
      RouteStop.updateMany({ routeId: id }, { isActive: false }),
    ]);

    if (!busRouteQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Bus route with id "${id}" not found`, BusRoute));
    }

    res.status(StatusCodes.OK).send({ ...busRouteQuery.toObject(), affectedRoueStops: routeStopQuery.modifiedCount });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', BusRoute));
  }
}

export { getBusRoutesAll, postBusRoute, getBusRouteById, getBusRoutesByCityId, putBusRouteById, deleteBusRouteById };
