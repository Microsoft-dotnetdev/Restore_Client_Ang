import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' },
    //importProvidersFrom(PaginationModule.forRoot()),
    //{ provide: LOCALE_ID, useValue: 'fr-FR' }       
  ]

};
