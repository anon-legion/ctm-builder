import { Request, Response } from 'express';
import { City } from '../models/types';
import cityDb from '../db/city-db';

async function getCitiesAll(req: Request, res: Response) {
  res.status(200).send('getCities');
}

async function postCity(req: Request<{}, {}, City>, res: Response) {
  const { id, name, isActive } = req.body;
  console.log(`isActive: ${isActive}\ntype: ${typeof isActive}`);
  await cityDb.push(`/cities[]`, { id, name, isActive });
  res.status(200).send(`postCity: ${id}, ${name}, ${isActive === false ? false : true}`);
}

async function getCityById(req: Request, res: Response) {
  res.status(200).send('getCityById');
}

export { getCitiesAll, postCity, getCityById };
