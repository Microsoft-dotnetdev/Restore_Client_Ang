import { Routes } from '@angular/router';

export const routes: Routes = [
  //{ path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) }
  { path: 'shop', loadChildren: () => import('./shop/shop.routes').then(r => r.routes) }
];
