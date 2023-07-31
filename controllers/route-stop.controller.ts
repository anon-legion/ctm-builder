import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import routeStopDb from '../db/route-stop/route-stop-db';
import { RouteStop } from '../models/types';

async function getRouteStopsAll(_: Request, res: Response) {
  try {
    const routeStopData = (await routeStopDb.getData('/route-stops')) as RouteStop[];
    res.status(StatusCodes.OK).send({ routeStopData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function postRouteStop(req: Request<{}, {}, RouteStop>, res: Response) {
  const { routeId, placeId, distance, isActive } = req.body;
  const id = `${routeId}-${placeId}`;
  try {
    await routeStopDb.push(`/route-stops[]`, {
      id,
      routeId,
      placeId,
      distance,
      isActive: isActive === false ? false : true,
    });
    res.status(StatusCodes.CREATED).send(`postRouteStop: ${id}, ${routeId}, ${placeId}, ${distance}, ${isActive}`);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getRouteStopById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const index = await routeStopDb.getIndex(`/route-stops`, id);
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`Route Stop with id "${id}" not found`);
      return;
    }
    const routeStopData = (await routeStopDb.getData(`/route-stops[${index}]`)) as RouteStop;
    res.status(StatusCodes.OK).send({ routeStopData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function putRouteStopById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { routeId, placeId, distance, isActive } = req.body;
    const index = await routeStopDb.getIndex(`/route-stops`, id);
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`Route Stop with id "${id}" not found`);
      return;
    }
    await routeStopDb.push(`/route-stops[${index}]`, {
      id,
      routeId,
      placeId,
      distance,
      isActive: isActive === false ? false : true,
    });
    const updatedRouteStopData = await routeStopDb.getData(`/route-stops[${index}]`);
    res.status(StatusCodes.OK).send({ updatedRouteStopData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { getRouteStopsAll, postRouteStop, getRouteStopById, putRouteStopById };
