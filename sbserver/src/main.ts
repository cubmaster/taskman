/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { auth } from 'express-oauth2-jwt-bearer';
import bodyParser from 'body-parser';
import { config } from './config/config';
//import { Mongo_utilities } from './utility/mongo_utilities';
import { eventsRouter } from './routes/eventsRouter';
const app = express();
const currentConfig = process.env.NODE_ENV ?? 'development';
// @ts-ignore: TS7053
const env = config[currentConfig];
let db: Db;
// @ts-ignore

const mongo_options: MongoClientOptions = {};

//const jwtCheck = auth({
//  audience: 'https://www.zharvest.com',
//  issuerBaseURL: 'https://dev-dg4e1mgu.auth0.com/',
//  tokenSigningAlg: 'RS256'
//});

//app.use(jwtCheck);
MongoClient.connect(env.db, mongo_options)
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db('db');
    app.use('/events', new eventsRouter().router);
    // Do something with the database here
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

console.log(currentConfig);
if (currentConfig == 'development') {
  app.use(
    cors({
      allowedHeaders: '*',
      credentials: true,
      origin: '*',
      methods: '*',
    })
  );
} //cors set up if dev
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

//app.use('/api',jwtCheck, new APIRouter(db).router);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
