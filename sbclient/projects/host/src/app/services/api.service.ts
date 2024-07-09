import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const headers = new Headers({
  'Content-Type': 'application/json',
});
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async  post(url:string,obj:undefined|object):Promise<any>{
    console.log(obj)
  // Create the request options
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj),
    };

    // Send the POST request
    return await fetch(environment.api_base + url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response data here
          return data;
        })
        .catch((error) => {
          // Handle errors here
          console.error('There was a problem with the fetch operation:', error);
        });


  }
  async  get(url:string):Promise<any>{
    // Create the request options
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    // Send the GET request
    return await fetch(environment.api_base + url, requestOptions)
  }

}
