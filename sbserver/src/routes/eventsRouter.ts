import express from 'express';
import { EventsHandler } from '../sevices/EventsHandler';
export class eventsRouter {
  public router = express.Router();

  constructor() {

    this.router.get('/', function (req, res, next) {
      const ai = new EventsHandler();
      const result=  ai.processICS().then(
        ()=>{
          res.json({});
        }
      )
    });
    
  }
}