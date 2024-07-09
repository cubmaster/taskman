import { Injectable } from '@angular/core';
import * as ical from 'ical.js';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { parseDragMeta } from '@fullcalendar/core/internal';
@Injectable({
  providedIn: 'root'
})
export class IcsParserService {

  constructor(private http: HttpClient) { }

  TARGET = 'https://outlook.office365.com/owa/calendar/33803c56c14c450c84d6f2c4731db8e2@pwc.com/528649b8fb754e80a5eaa67cb7413ee66978020515810768538/calendar.ics'



  parseData(data: Blob){
    const jcalData = ical.default.parse(data);
    const jevents = new ical.default.component(jcalData);
    console.log(jevents);
  }

  fetchICS() {
    const url = this.TARGET; // Replace with your server endpoint
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });

    const result = fetch(url, 
      {   
   
        mode:"no-cors",
        method: 'GET',
        redirect: "follow"

      },
    ).then(response => {
      console.log(response)
      return response.text();
    }).then(data => {
        console.log(data);
    });
    
  }

  parseICS(icsContent: string) {
    try {
      const jcalData = ical.default.parse(icsContent);
      const comp = new ical.default.Component(jcalData);
      const events = comp.getAllSubcomponents('vevent');

      events.forEach(event => {
        const summary = event.getFirstPropertyValue('summary');
        const dtstart = event.getFirstPropertyValue('dtstart');
        const dtend = event.getFirstPropertyValue('dtend');
        const description = event.getFirstPropertyValue('description');
        const location = event.getFirstPropertyValue('location');

        console.log('Event Summary:', summary);
        console.log('Start Date:', dtstart.toJSDate());
        console.log('End Date:', dtend.toJSDate());
        console.log('Description:', description);
        console.log('Location:', location);
      });
    } catch (error) {
      console.error('Error parsing ICS', error);
    }
  }



}
