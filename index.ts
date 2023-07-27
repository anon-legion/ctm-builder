import express, { Express, Request, Response } from 'express';

// initialize express
const app: Express = express();
const port = process.env.PORT ?? 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript Server');
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
