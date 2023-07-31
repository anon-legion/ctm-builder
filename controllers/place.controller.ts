import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import placeDb from '../db/place/place-db';
import { Place } from '../models/types';

async function getPlacesAll(_: Request, res: Response) {
  try {
    const placeData = (await placeDb.getData('/places')) as Place[];
    res.status(StatusCodes.OK).send({ placeData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function postPlace(req: Request<{}, {}, Place>, res: Response) {
  const { cityId, name, aliases, isActive } = req.body;
  console.log(`isActive: ${isActive}\n ${typeof isActive}`);
  const placeCount = await placeDb.count('/places');
  const id = Number(placeCount) + 1;
  try {
    await placeDb.push(`/places[]`, { id, cityId, name, aliases, isActive: isActive === false ? false : true });
    res
      .status(StatusCodes.CREATED)
      .send(`postPlace: ${id}, ${cityId}, ${name}, ${aliases}, ${isActive === false ? false : true}`);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getPlaceById(req: Request<Place, {}, {}>, res: Response) {
  try {
    const id = Number(req.params.id);
    const index = await placeDb.getIndex(`/places`, Number(id));
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`Place with id "${id}" not found`);
      return;
    }
    const placeData = (await placeDb.getData(`/places[${index}]`)) as Place;
    res.status(StatusCodes.OK).send({ placeData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function putPlaceById(req: Request<Place, {}, Place>, res: Response) {
  try {
    const id = Number(req.params.id);
    const { cityId, name, aliases, isActive } = req.body;
    const index = await placeDb.getIndex(`/places`, id);
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`Place with id "${id}" not found`);
      return;
    }
    await placeDb.push(`/places[${index}]`, {
      id,
      cityId,
      name,
      aliases,
      isActive: isActive === false ? false : true,
    });
    const updatedPlaceData = await placeDb.getData(`/places[${index}]`);
    res.status(StatusCodes.OK).send({ updatedPlaceData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { getPlacesAll, postPlace, getPlaceById, putPlaceById };
