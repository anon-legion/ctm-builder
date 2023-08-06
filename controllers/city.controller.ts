import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import City from '../models/City';
import cityDb from '../db/city/city-db';
import { City as CityType, ICity } from '../models/types';

async function getCitiesAll(_: Request, res: Response) {
  try {
    const cityQuery = (await City.find({}, ['-__v']).sort({ name: 1 })) as ICity[];
    return res.status(StatusCodes.OK).send([...cityQuery]);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function postCity(req: Request<{}, {}, CityType>, res: Response) {
  const { name, isActive } = req.body;
  try {
    const cityQuery = await City.create({ name, isActive });
    return res.status(StatusCodes.CREATED).send({ ...cityQuery.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send({ message: 'Resource already exists' });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
}

async function getCityById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const cityQuery = await City.findById(id);
    if (!cityQuery) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: `City with id "${id}" not found` });
    }
    return res.status(StatusCodes.OK).send({ ...cityQuery.toObject() });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function putCityById(req: Request, res: Response) {
  const { id } = req.params;
  const { name, isActive } = req.body;
  try {
    const cityQuery = await City.findByIdAndUpdate(id, { name, isActive }, { new: true });
    console.log(cityQuery);
    if (!cityQuery) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: `City with id "${id}" not found` });
    }
    return res.status(StatusCodes.OK).send({ ...cityQuery.toObject() });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteCityById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const cityQuery = await City.findByIdAndDelete(id);
    console.log(cityQuery);
    return res.status(StatusCodes.OK).send({ message: `City with id "${id}" deleted` });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { getCitiesAll, postCity, getCityById, putCityById, deleteCityById };
