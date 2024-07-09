import { Component ,ElementRef,OnInit, ViewChild} from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {

  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.setLoginDisplay();
        },
        error: (error) => console.log(error)
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
  logout(){
    this.authService.logout()
  }


}
