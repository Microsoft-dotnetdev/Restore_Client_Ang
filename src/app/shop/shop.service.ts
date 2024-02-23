import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product, ProductResponse } from '../shared/models/product';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient);
  constructor() { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId > 0) params = params.append('brands', shopParams.brandId);
    if (shopParams.typeId > 0) params = params.append('types', shopParams.typeId);
    params = params.append('OrderBy', shopParams.sort);
    params = params.append('pageNumber', shopParams.pagination.pageNumber);
    params = params.append('pageSize', shopParams.pagination.pageSize);
    return this.http.get<ProductResponse>(this.baseUrl + 'products', { params })
    //return this.http.get<Product[]>(this.baseUrl + 'products', { params, observe: 'response' })
  }

  getBrands() {
    return this.http.get<ProductBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<ProductType[]>(this.baseUrl + 'products/types');
  }
}
