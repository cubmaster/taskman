import { Injectable } from '@angular/core';

import { MsalService } from '@azure/msal-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(
    private http: HttpClient,private msal: MsalService
  ) { }




   fetchProfile(): Observable<ProfileType>{
    return this.http.get<ProfileType>('https://graph.microsoft.com/v1.0/me')

  }
  fetchCalendar(): Observable<any>{

    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    const params ={
      startdate:currentDate.toISOString(),
      enddate:nextMonthDate.toISOString(),
    }
    
    const myHeaders = new HttpHeaders();
    const token = this.msal.instance.getAllAccounts()[0]?.idToken;
    myHeaders.append('Authorization','Bearer '+token)

    return this.http.post("https://prod-07.westus.logic.azure.com:443/workflows/e20b6e86cc9245929ce7989bcd3ea783/triggers/manual/paths/invoke?api-version=2016-06-01",
      JSON.stringify(params),
      {
        headers:myHeaders,
        withCredentials:true,
        
      })
  
  }


}
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