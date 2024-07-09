import { Component,OnInit  } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { GraphService } from '../services/graph.service';



type ProfileType = {
  businessPhones?: string,
  displayName?: string,
  givenName?: string,
  jobTitle?: string,
  mail?: string,
  mobilePhone?: string,
  officeLocation?: string,
  preferredLanguage?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit{
  profile!: ProfileType;
  tokenExpiration!: string;

  constructor(
    private http: HttpClient,private graph: GraphService
  ) { }


  async ngOnInit() {

    this.graph.fetchProfile().subscribe(profile => {
       this.profile = profile;
       this.graph.fetchCalendar().subscribe((events)=>{
        console.log(events);
      })
    });




  }
}
