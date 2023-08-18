import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import City from '../models/City';
import BusRoute from '../models/Bus-Route';
import Place from '../models/Place';
import RouteStop from '../models/Route-Stop';
import errorObject from './utils/generic-error-object';

async function getCitiesAll(_: Request, res: Response) {
  try {
    const cityQuery = await City.find({ isActive: true }, ['-__v']).sort({ name: 1 });
    res.status(StatusCodes.OK).send([...cityQuery]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
}

async function postCity(req: Request, res: Response) {
  const { name, isActive } = req.body;

  try {
    const cityQuery = await City.create({ name, isActive });
    res.status(StatusCodes.CREATED).send({ ...cityQuery.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send(errorObject('Resource already exists', City));
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', City));
  }
}

async function getCityById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const cityQuery = await City.findById(id).select('-__v');

    if (!cityQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`City with id "${id}" not found`, City));
    }

    res.status(StatusCodes.OK).send({ ...cityQuery.toObject() });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', City));
  }
}

async function putCityById(req: Request, res: Response) {
  const { id } = req.params;
  const { name, isActive } = req.body;

  try {
    const cityQuery = await City.findByIdAndUpdate(id, { name, isActive }, { new: true }).select('-__v');

    if (!cityQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`City with id "${id}" not found`, City));
    }

    if (!isActive) {
      const [busRouteIds, placeIds] = await Promise.all([
        BusRoute.find({ cityId: id }).select('_id'),
        Place.find({ cityId: id }).select('_id'),
      ]);

      await Promise.all([
        BusRoute.updateMany({ cityId: id }, { isActive: false }),
        Place.updateMany({ cityId: id }, { isActive: false }),
        RouteStop.updateMany(
          {
            $or: [
              { busRouteId: { $in: busRouteIds.map((busRoute) => busRoute._id) } },
              { placeId: { $in: placeIds.map((place) => place._id) } },
            ],
          },
          { $set: { isActive: false } }
        ),
      ]);
    }

    res.status(StatusCodes.OK).send({ ...cityQuery.toObject() });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send(errorObject('Resource already exists', City));
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', City));
  }
}

async function deleteCityById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // const cityQuery = await City.findByIdAndDelete(id).select('-__v');
    const [cityQuery, busRouteIds, placeIds] = await Promise.all([
      City.findByIdAndUpdate(id, { isActive: false }, { returnDocument: 'after' }).select('-__v'),
      BusRoute.find({ cityId: id }).select('_id'),
      Place.find({ cityId: id }).select('_id'),
    ]);

    if (!cityQuery) {
      return res.status(StatusCodes.NOT_FOUND).send(errorObject(`City with id "${id}" not found`, City));
    }

    const [busRouteQuery, placeQuery, routeStopQuery] = await Promise.all([
      BusRoute.updateMany({ cityId: id }, { isActive: false }),
      Place.updateMany({ cityId: id }, { isActive: false }),
      RouteStop.updateMany(
        {
          $or: [
            { busRouteId: { $in: busRouteIds.map((busRoute) => busRoute._id) } },
            { placeId: { $in: placeIds.map((place) => place._id) } },
          ],
        },
        { $set: { isActive: false } }
      ),
    ]);

    res.status(StatusCodes.OK).send({
      ...cityQuery.toObject(),
      affectedBusRoutes: busRouteQuery.modifiedCount,
      affectedPlaces: placeQuery.modifiedCount,
      affectedRouteStops: routeStopQuery.modifiedCount,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorObject('Internal server error', City));
  }
}

export { getCitiesAll, postCity, getCityById, putCityById, deleteCityById };
