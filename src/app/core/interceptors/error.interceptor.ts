import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  //console.log('Interceptor:', req.url);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        if (error.status === 400) {
          if (error.error.errors) {
            throw error.error;
          }
          else {
            toastr.error(error.error.message, error.status.toString());
          }
        }
        if (error.status === 401) {
          toastr.error(error.error.message, error.status.toString());
        }
        if (error.status === 404) {
          router.navigateByUrl('/not-found');
        }
        if (error.status === 500) {
          const navigationExtras: NavigationExtras = { state: { error: error.error } }
          router.navigateByUrl('/server-error', navigationExtras);
        }
      }
      return throwError(() => new Error(error.message))
    })
  );
};
