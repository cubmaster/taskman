import { Component, OnInit } from '@angular/core';
import timeGridPlugin from '@fullcalendar/timegrid'
import { CalendarOptions } from '@fullcalendar/core';
import { IcsParserService } from '../services/ics-parser.service';
import { GraphService } from '../services/graph.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],

})
export class CalendarComponent implements OnInit {

  constructor(private graph:GraphService){}
  async ngOnInit(): Promise<void> {
     const events = this.graph.fetchCalendar().subscribe((events)=>{
        console.log(events);
     });

  }


  calendarOptions: CalendarOptions ={
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // user can switch between the two
    }
  };
}
