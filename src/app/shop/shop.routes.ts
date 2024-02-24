import { Routes } from '@angular/router';
import { ShopComponent } from './shop.component';


export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: ':id', loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent) }
  /* { path: '', component: ShopComponent, pathMatch: 'full' } */
];
