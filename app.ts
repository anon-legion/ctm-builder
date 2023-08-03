import express, { Response, application } from 'express';
import 'express-async-errors'; // import immediately to patch express
// import security packages
import helmet from 'helmet';
import cors from 'cors';
// import modules
import mongoose from 'mongoose';
import cityRouter from './routes/city.route';
import busRouteRouter from './routes/bus-route.route';
import placeRouter from './routes/place.route';
import routeStopRouter from './routes/route-stop.route';
import notFoundMiddlware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

// initialize express
const app = express();
const port = process.env.PORT ?? 3000;

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/bus-routes', busRouteRouter);
app.use('/api/v1/places', placeRouter);
app.use('/api/v1/route-stops', routeStopRouter);
app.use('/api/v1/test_endpoint', (_, res: Response) => {
  res.status(200).send('Express + Typescript Server');
});

// 404 and error handler middleware to catch request errors
app.use(notFoundMiddlware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // establish connection to MongoDB and start server
    await mongoose.connect(process.env.MONGO_URI!);
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port [${port}]`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

// start server
start();
