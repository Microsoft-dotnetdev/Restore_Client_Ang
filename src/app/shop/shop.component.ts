import { Component, OnInit, inject, signal } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Pagination } from '../shared/models/pagination';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  products: Product[] = [];
  productBrands: ProductBrand[] = [];
  productTypes: ProductType[] = [];
  pagination: Pagination | null = null;
  brandIdSelected = signal(0);
  typeIdSelected = signal(0);
  sortSelected = signal('name');
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
    this.shopService.getProducts(this.brandIdSelected(), this.typeIdSelected(), this.sortSelected()).subscribe(
      {
        next: (res) => {
          const paging = res.headers.get('pagination')
          if (paging) {
            this.pagination = JSON.parse(paging);
          }
          if (res.body)
            this.products = res.body;
        },
        error: (err) => console.log(err),
        complete() {
          console.log('request completed');
        },

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
    this.brandIdSelected.set(brandId);
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.typeIdSelected.set(typeId);
    this.getProducts();
  }

  onSortSelected(selectedVal: string) {
    //console.log(selectedVal);
    this.sortSelected.set(selectedVal);
    this.getProducts();
  }
}
