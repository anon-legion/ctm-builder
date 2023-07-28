import express, { Response } from 'express';
import 'express-async-errors'; // import immediately to patch express
// import security packages
import helmet from 'helmet';
import cors from 'cors';
// import modules
import cityRouter from './routes/city.route';

// initialize express
const app = express();
const port = process.env.PORT ?? 3000;

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/test_endpoint', (_, res: Response) => {
  res.status(200).send('Express + Typescript Server');
});

const start = async () => {
  try {
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
