import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
  const { id, cityId, name, isActive } = req.body;
  console.log(`isActive: ${isActive}\n ${typeof isActive}`);
  try {
    await busRouteDb.push(`/bus-routes[]`, { id, cityId, name, isActive: isActive === false ? false : true });
    res
      .status(StatusCodes.CREATED)
      .send(`postBusRoute: ${id}, ${cityId}, ${name}, ${isActive === false ? false : true}`);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getBusRouteById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const index = await busRouteDb.getIndex(`/bus-routes`, id);
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`Bus Route with id "${id}" not found`);
      return;
    }
    const busRouteData = (await busRouteDb.getData(`/bus-routes[${index}]`)) as Route;
    res.status(StatusCodes.OK).send({ busRouteData });
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

export { getBusRoutesAll, postBusRoute, getBusRouteById, putBusRouteById };
