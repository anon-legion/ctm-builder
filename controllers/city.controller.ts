import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import City from '../models/City';
import cityDb from '../db/city/city-db';
import { City as CityType, ICity } from '../models/types';

async function getCitiesAll(_: Request, res: Response) {
  try {
    const cityQuery = (await City.find({}, ['-__v']).sort({ name: 1 })) as ICity[];
    res.status(StatusCodes.OK).send([...cityQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function postCity(req: Request<{}, {}, CityType>, res: Response) {
  const { name, isActive } = req.body;
  try {
    const newCity = await City.create({ name, isActive: isActive === false ? false : true });
    res.status(StatusCodes.CREATED).send({ ...newCity.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(StatusCodes.CONFLICT).send('Resource already exists');
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
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
    const cityData = (await cityDb.getData(`/cities[${index}]`)) as CityType;
    res.status(StatusCodes.OK).send({ ...cityData });
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

async function deleteCityById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const cityQuery = await City.findByIdAndDelete(id);
    console.log(cityQuery);
    res.status(StatusCodes.OK).send(`City with id "${id}" deleted`);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { getCitiesAll, postCity, getCityById, putCityById, deleteCityById };
