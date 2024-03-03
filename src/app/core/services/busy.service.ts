import { Injectable, inject, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  private busyRequestCount = signal(0);
  private spinnerService = inject(NgxSpinnerService);
  isLoading = true;

  busy() {
    this.busyRequestCount.update(val => val++);
    this.isLoading = true
    this.spinnerService.show(undefined, {
      type: 'timer',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    })
  }

  idle() {
    this.busyRequestCount.update(val => val--);
    if (this.busyRequestCount() <= 0) {
      this.busyRequestCount.set(0);
      this.spinnerService.hide();
    }
    this.isLoading = false;
  }


}
