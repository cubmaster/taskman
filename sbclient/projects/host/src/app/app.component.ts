import { Component ,ElementRef,OnInit, ViewChild} from '@angular/core';
import { GameService,GameResponse, GameMove } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {

  @ViewChild('textFieldRef', { static: false }) textFieldRef: ElementRef|any ;
  title = 'host';

  
  response:GameResponse = new GameResponse();
  constructor(private game: GameService){

  }


  async ngOnInit() {

    this.response = await this.game.startGame("Jon")
    this.textFieldRef.nativeElement.value="";
    
  }

  async onAction(action: string) {
    const move:GameMove = {
      player: {...this.response?.player},
      action: action

    }

    this.response = await this.game.move(move);

    this.textFieldRef.nativeElement.value="";
  }

  setval(action:string) {
    alert(action)
  }
}
