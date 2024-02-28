import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // Toastr providers
    provideHttpClient(withInterceptors([errorInterceptor])),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' },
    //importProvidersFrom(PaginationModule.forRoot()),
    //{ provide: LOCALE_ID, useValue: 'fr-FR' }       
  ]

};
