import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { MsalGuard } from '@azure/msal-angular';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: 'profile', component: ProfileComponent,canActivate: [MsalGuard] },
  { path: 'Calendar', component: CalendarComponent,canActivate: [MsalGuard] },
  { path: '', component: CalendarComponent,canActivate: [MsalGuard] },
  { path: '*', component: CalendarComponent,canActivate: [MsalGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
