import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BusRoute from '../models/Bus-Route';
import busRouteDb from '../db/bus-route/bus-route-db';
import { Route } from '../models/types';

async function getBusRoutesAll(_: Request, res: Response) {
  try {
    const busRouteData = (await busRouteDb.getData('/bus-routes')) as Route[];
    res.status(StatusCodes.OK).send({ busRouteData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function postBusRoute(req: Request<{}, {}, Route>, res: Response) {
  const { cityId, name, isActive } = req.body;
  try {
    const busRouteQuery = await BusRoute.create({ cityId, name, isActive });
    console.log(busRouteQuery);
    res.status(StatusCodes.CREATED).send({ ...busRouteQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getBusRouteById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const index = await busRouteDb.getIndex('/bus-routes', id);
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`Bus route with id "${id}" not found`);
      return;
    }
    const busRouteData = (await busRouteDb.getData(`/bus-routes[${index}]`)) as Route;
    res.status(StatusCodes.OK).send({ busRouteData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getBusRouteByCityId(req: Request, res: Response) {
  const { id: cityId } = req.params;
  try {
    const busRouteQuery = await BusRoute.find({ cityId }, ['-__v']).sort({ name: 1 });
    if (!busRouteQuery.length) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: `Bus route with city id "${cityId}" not found` });
    }
    res.status(StatusCodes.OK).send([...busRouteQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function putBusRouteById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { cityId, name, isActive } = req.body;
    const index = await busRouteDb.getIndex(`/bus-routes`, id);
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`Bus Route with id "${id}" not found`);
      return;
    }
    await busRouteDb.push(`/bus-routes[${index}]`, {
      id,
      cityId,
      name,
      isActive: isActive === false ? false : true,
    });
    const updatedBusRouteData = await busRouteDb.getData(`/bus-routes[${index}]`);
    res.status(StatusCodes.OK).send({ updatedBusRouteData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { getBusRoutesAll, postBusRoute, getBusRouteById, getBusRouteByCityId, putBusRouteById };
