import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private api: ApiService) { }

  async startGame(player_name:string):Promise<GameResponse>{
       return await this.api.post("ai/startgame",{name:player_name})
  }
  async move(obj:GameMove){
    return await this.api.post("ai/move",obj)
  }

}
export class GameResponse{
  "scene":GameScene =new GameScene();
  "options":string[] = [];
  "player":object = {}
}
export class GameMove{
  "player":object = {};
  "action":string = "";
}
export class GameScene
{
  description: string="";
  monsters:string[] = [] ;
  treasure:string[]=[];
}