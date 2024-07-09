
import dotenv from 'dotenv'; 
import * as ical from 'node-ical';


dotenv.config();




export class EventsHandler {

  TARGET ='https://outlook.office365.com/owa/calendar/33803c56c14c450c84d6f2c4731db8e2@pwc.com/528649b8fb754e80a5eaa67cb7413ee66978020515810768538/calendar.ics'

  async processICS(){
    const cal:ical.CalendarResponse = await ical.async.fromURL(this.TARGET);
    const calComponents = Object.values(cal);
    calComponents.forEach((component)=>{
      console.log(component);
    })

  }


}

export class event{
  summary:string="";
  description:string="";
  start:Date=new Date() ;
  end:Date=new Date() ;
}