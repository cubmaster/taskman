import express from 'express';
import { GenAI } from '../sevices/genAi';
export class AiRouter {
  public router = express.Router();

  constructor() {
    this.router.param('chat', function (req, res, next, obj) {
      // @ts-ignore: TS7053
      req['chat'] = obj;
      next();
    });

    this.router.post('/StartGame', function (req, res, next) {
      const ai = new GenAI();
      const result=  ai.startGame(req.body).then(
        (result)=>{

          res.json(result);
        }
      )
    
     
    });
    this.router.post('/move', function (req, res, next) {
      const ai = new GenAI();
      const result=  ai.nextmove(req.body).then(
        (result)=>{
          res.json(result);
        }
      )
    
     
    });
  }
}