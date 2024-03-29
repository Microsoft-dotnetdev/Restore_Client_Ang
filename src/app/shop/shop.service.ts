import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';
import { Pagination } from '../shared/models/pagination';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl //'https://localhost:5001/api/'
  private http = inject(HttpClient);
  constructor() { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId != '') params = params.append('brands', shopParams.brandId);
    if (shopParams.typeId != '') params = params.append('types', shopParams.typeId);
    params = params.append('OrderBy', shopParams.sort);
    params = params.append('pageNumber', shopParams.pagination.pageNumber);
    params = params.append('pageSize', shopParams.pagination.pageSize);
    params = params.append('searchTerm', shopParams.search);
    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', { params })
    //return this.http.get<Product[]>(this.baseUrl + 'products', { params, observe: 'response' })
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id)
  }

  getBrands() {
    return this.http.get<ProductBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<ProductType[]>(this.baseUrl + 'products/types');
  }
}
