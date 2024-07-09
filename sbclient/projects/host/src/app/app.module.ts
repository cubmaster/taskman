import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';


// HTTP modules required by MSAL
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Required for MSAL
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
      clientId:  "c5551e10-5e37-43a0-bd6b-0046d9deeccf",
      // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
      authority: "https://login.microsoftonline.com/513294a0-3e20-41b2-a970-6d30bf1546fa",
      // Must be the same redirectUri as what was provided in your app registration.
      redirectUri: "http://localhost:4200",
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE
    }
  });
}

// MSAL Interceptor is required to request access tokens in order to access the protected resource (Graph)
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['User.Read']],
      //['https://graph.microsoft.com/v1.0/me/calendarview', ['Calendars.Read']],
    ]),
  };
}

// MSAL Guard is required to protect routes and require authentication before accessing protected routes
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {scopes: ['User.Read']}
  };
}


// @ts-nocheck
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
