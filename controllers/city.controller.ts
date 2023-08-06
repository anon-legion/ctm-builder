import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import City from '../models/City';
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
    const cityQuery = await City.create({ name, isActive });
    res.status(StatusCodes.CREATED).send({ ...cityQuery.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send({ message: 'Resource already exists' });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
}

async function getCityById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const cityQuery = await City.findById(id);
    if (!cityQuery) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: `City with id "${id}" not found` });
    }
    res.status(StatusCodes.OK).send({ ...cityQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function putCityById(req: Request, res: Response) {
  const { id } = req.params;
  const { name, isActive } = req.body;
  try {
    const cityQuery = await City.findByIdAndUpdate(id, { name, isActive }, { new: true });
    if (!cityQuery) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: `City with id "${id}" not found` });
    }
    res.status(StatusCodes.OK).send({ ...cityQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteCityById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const cityQuery = await City.findByIdAndDelete(id).select('-__v');
    if (!cityQuery) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: `City with id "${id}" not found` });
    }
    res.status(StatusCodes.OK).send({ ...cityQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { getCitiesAll, postCity, getCityById, putCityById, deleteCityById };
