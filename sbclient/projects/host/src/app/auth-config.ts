// auth-config.ts
import { Configuration, IPublicClientApplication, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'c5551e10-5e37-43a0-bd6b-0046d9deeccf', // Replace with your Azure AD Client ID
    authority: 'https://login.microsoftonline.com/513294a0-3e20-41b2-a970-6d30bf1546fa', // Replace with your Azure AD Tenant ID
    redirectUri: 'http://localhost:4200', // Replace with your redirect URI
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      logLevel: LogLevel.Info,
    },
  },
};

export const loginRequest = {
  scopes: ['user.read'],
};

export const tokenRequest = {
  scopes: ['api://c5551e10-5e37-43a0-bd6b-0046d9deeccf/.default'], // Replace with the scopes required for your API
};
