import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import routeStopDb from '../db/route-stop/route-stop-db';
import { RouteStop } from '../models/types';

async function getRouteStopsAll(_: Request, res: Response) {
  try {
    const routeStopData = (await routeStopDb.getData('/routeStops')) as RouteStop[];
    res.status(StatusCodes.OK).send({ routeStopData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function postRouteStop(req: Request<{}, {}, RouteStop>, res: Response) {
  const { routeId, placeId, distance, isActive } = req.body;
  const id = `${routeId}-${placeId}`;
  try {
    await routeStopDb.push(`/routeStops[]`, {
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

export default { getRouteStopsAll, postRouteStop };
