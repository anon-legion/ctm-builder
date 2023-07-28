import { Request, Response } from 'express';

async function getCitiesAll(req: Request, res: Response) {
  res.status(200).send('getCities');
}

async function postCity(req: Request, res: Response) {
  res.status(200).send('postCity');
}

async function getCityById(req: Request, res: Response) {
  res.status(200).send('getCityById');
}

export { getCitiesAll, postCity, getCityById };
