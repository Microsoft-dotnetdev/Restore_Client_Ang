import { Component, OnInit, inject, signal } from '@angular/core';
import { ShopService } from './shop.service';
import { Product, ProductResponse } from '../shared/models/product';
import { Pagination } from '../shared/models/pagination';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ShopParams } from '../shared/models/shop-params';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductItemComponent, PaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  productBrands: ProductBrand[] = [];
  productTypes: ProductType[] = [];

  productResponse = signal<ProductResponse>(new ProductResponse());
  shopParams = signal(new ShopParams());

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'price' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];

  ngOnInit(): void {
    this.getProducts();
    this.getProductBrands();
    this.getProductTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams()).subscribe(
      {
        next: (res) => {
          this.productResponse.set(res);
        },
        error: (err) => console.log(err)
      }
    );
  }

  getProductBrands() {
    this.shopService.getBrands().subscribe(
      {
        next: response => this.productBrands = [{ id: 0, name: 'All' }, ...response],
        error: err => console.log(err)
      }
    )
  }
  getProductTypes() {
    this.shopService.getTypes().subscribe(
      {
        next: response => this.productTypes = [{ id: 0, name: 'All' }, ...response],
        error: err => console.log(err)
      }
    )
  }

  onBrandSelected(brandId: number) {
    //this.shopParams.set({ ...this.shopParams(), brandId });
    this.shopParams.update((state: ShopParams) => {
      return { ...state, brandId, pagination: new Pagination() }
    });
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.update((state: ShopParams) => {
      return { ...state, typeId, pagination: new Pagination() }
    });
    this.getProducts();
  }

  onSortSelected(selectedVal: string) {
    this.shopParams.update((state: ShopParams) => {
      return { ...state, sort: selectedVal, pagination: new Pagination() }
    });
    this.getProducts();
  }


  onPageChanged(event: any) {
    if (this.shopParams().pagination.pageNumber !== event.page) {
      this.shopParams.update((state: ShopParams) => {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            pageNumber: event.page,
          }
        }
      });
      this.getProducts();
    }
  }

}
