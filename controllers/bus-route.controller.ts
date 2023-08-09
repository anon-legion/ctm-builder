import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BusRoute from '../models/Bus-Route';
import errorObject from './utils/generic-error-object';

async function getBusRoutesAll(_: Request, res: Response) {
  try {
    const busRouteQuery = await BusRoute.find({}, ['-__v']).sort({ name: 1 });
    res.status(StatusCodes.OK).send([...busRouteQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function postBusRoute(req: Request, res: Response) {
  const { cityId, name, isActive } = req.body;
  try {
    const busRouteQuery = await BusRoute.create({ cityId, name, isActive });
    res.status(StatusCodes.CREATED).send({ ...busRouteQuery.toObject() });
  } catch (err) {
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

async function getBusRouteByCityId(req: Request, res: Response) {
  const { id: cityId } = req.params;
  try {
    const busRouteQuery = await BusRoute.find({ cityId }, ['-__v']).sort({ name: 1 });
    if (!busRouteQuery.length) {
      return res.status(StatusCodes.NOT_FOUND).send([]);
    }
    res.status(StatusCodes.OK).send([...busRouteQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function putBusRouteById(req: Request, res: Response) {
  const { id } = req.params;
  const { cityId, name, isActive } = req.body;
  try {
    const busRouteQuery = await BusRoute.findByIdAndUpdate(id, { cityId, name, isActive }, { new: true }).select(
      '-__v'
    );
    if (!busRouteQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Bus route with id "${id} not found`, BusRoute));
    }
    res.status(StatusCodes.OK).send({ ...busRouteQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', BusRoute));
  }
}

async function deleteBusRouteById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const busRouteQuery = await BusRoute.findByIdAndDelete(id).select('-__v');
    if (!busRouteQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`Bus route with id "${id}" not found`, BusRoute));
    }
    res.status(StatusCodes.OK).send({ ...busRouteQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', BusRoute));
  }
}

export { getBusRoutesAll, postBusRoute, getBusRouteById, getBusRouteByCityId, putBusRouteById, deleteBusRouteById };
