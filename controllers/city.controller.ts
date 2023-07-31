import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import cityDb from '../db/city/city-db';
import { City } from '../models/types';

async function getCitiesAll(_: Request, res: Response) {
  try {
    const cityData = (await cityDb.getData('/cities')) as City[];
    res.status(StatusCodes.OK).send({ cityData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function postCity(req: Request<{}, {}, City>, res: Response) {
  const { id, name, isActive } = req.body;
  try {
    await cityDb.push(`/cities[]`, { id, name, isActive: isActive === false ? false : true });
    res.status(StatusCodes.CREATED).send(`postCity: ${id}, ${name}, ${isActive === false ? false : true}`);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCityById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const index = await cityDb.getIndex(`/cities`, id);
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`City with id "${id}" not found`);
      return;
    }
    const cityData = (await cityDb.getData(`/cities[${index}]`)) as City;
    res.status(StatusCodes.OK).send({ cityData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function putCityById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    const index = await cityDb.getIndex(`/cities`, id);
    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).send(`City with id "${id}" not found`);
      return;
    }
    await cityDb.push(`/cities[${index}]`, {
      id,
      name,
      isActive: isActive === false ? false : true,
    });
    const updatedCityData = await cityDb.getData(`/cities[${index}]`);
    res.status(StatusCodes.OK).send({ updatedCityData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { getCitiesAll, postCity, getCityById, putCityById };
