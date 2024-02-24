import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Pagination } from '../shared/models/pagination';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';
import { PagingHeaderComponent } from '../shared/paging-header/paging-header.component';
import { PagerComponent } from '../shared/pager/pager.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductItemComponent, PagingHeaderComponent, PagerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);

  productBrands = signal<ProductBrand[]>([]);
  productTypes = signal<ProductType[]>([]);

  products = signal(new Pagination<Product>());
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

  getProducts(reload: boolean = true) {
    if (reload) {
      this.shopParams.update(v => {
        v.pagination = new Pagination<Product>();
        return v;
      });
    }

    this.shopService.getProducts(this.shopParams()).subscribe(
      {
        next: (res) => {
          this.products.set(res)
        },
        error: (err) => console.log(err)
      }
    );
  }

  getProductBrands() {
    this.shopService.getBrands().subscribe(
      {
        next: response => this.productBrands.set([{ id: 0, name: 'All' }, ...response]),
        error: err => console.log(err)
      }
    )
  }
  getProductTypes() {
    this.shopService.getTypes().subscribe(
      {
        next: response => this.productTypes.set([{ id: 0, name: 'All' }, ...response]),
        error: err => console.log(err)
      }
    )
  }

  onBrandSelected(brandId: number) {
    this.shopParams.update(v => {
      v.brandId = brandId;
      return v;
    });
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.update(v => {
      v.typeId = typeId;
      return v;
    });
    this.getProducts();
  }
  onSortSelected(selectedVal: string) {
    this.shopParams.update(v => {
      v.sort = selectedVal;
      return v;
    });
    this.getProducts();
  }
  onSearch(searchVal: string) {
    this.onSearchChange(searchVal);
    this.getProducts()
  }
  onReset() {
    this.shopParams.set(new ShopParams());
    this.getProducts();
  }
  onSearchChange(searchVal: string) {
    this.shopParams.update(v => {
      v.search = searchVal
      return v;
    });
    //console.log("Search: " + this.shopParams().search);
  }

  onPageChanged(event: any) {
    if (this.shopParams().pagination.pageNumber !== event.page) {
      this.shopParams.update(v => {
        v.pagination.pageNumber = event.page
        return v;
      })
      this.getProducts(false);
    }
  }



}
