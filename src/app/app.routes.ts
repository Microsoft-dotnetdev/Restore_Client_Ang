import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', loadComponent: () => import('./core/not-found/not-found.component').then(c => c.NotFoundComponent) },
  { path: 'server-error', loadComponent: () => import('./core/server-error/server-error.component').then(c => c.ServerErrorComponent) },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'shop', loadChildren: () => import('./shop/shop.routes').then(r => r.routes) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
