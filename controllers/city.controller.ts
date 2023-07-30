import { Request, Response } from 'express';
import { City } from '../models/types';
import { StatusCodes } from 'http-status-codes';
import cityDb from '../db/city-db';

async function getCitiesAll(_: Request, res: Response) {
  try {
    const cityData = await cityDb.getData('/cities');
    res.status(StatusCodes.OK).send({ cityData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function postCity(req: Request<{}, {}, City>, res: Response) {
  const { id, name, isActive } = req.body;
  console.log(`isActive: ${isActive}\n ${typeof isActive}`);
  try {
    await cityDb.push(`/cities[]`, { id, name, isActive: `${isActive === false ? false : true}` });
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
    const cityData = await cityDb.getData(`/cities[${index}]`);
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
      isActive: `${isActive === false ? false : true}`,
    });
    const updatedCityData = await cityDb.getData(`/cities[${index}]`);
    res.status(StatusCodes.OK).send({ updatedCityData });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { getCitiesAll, postCity, getCityById, putCityById };
