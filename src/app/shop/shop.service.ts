import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient);
  constructor() { }

  getProducts(brandId?: number, typeId?: number, sort?: string) {
    let params = new HttpParams();

    if (brandId && brandId > 0) params = params.append('brands', brandId);
    if (typeId && typeId > 0) params = params.append('types', typeId);
    if (sort) params = params.append('OrderBy', sort);

    return this.http.get<Product[]>(this.baseUrl + 'products', { params, observe: 'response' })
  }

  getBrands() {
    return this.http.get<ProductBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<ProductType[]>(this.baseUrl + 'products/types');
  }
}
