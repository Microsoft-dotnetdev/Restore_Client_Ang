import { Component, Input, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product = signal<Product | undefined>(undefined)
  @Input('id') productId?: string;
  private shopService = inject(ShopService)
  private breadCrumbService = inject(BreadcrumbService)
  private productSub: Subscription | undefined

  ngOnInit(): void {
    /* this.product.set({
      name: '',
      description: '',
      id: 0,
      pictureUrl: '',
      price: 0,
      productBrand: '',
      productType: '',
      quantityInStock: 0
    }); */
    //console.log(this.productId);
    this.loadProduct();
  }

  constructor() {
    this.breadCrumbService.set('@productDetails', ' ');
  }

  loadProduct() {
    if (this.productId) {
      const prodId = Number(this.productId);
      this.productSub = this.shopService.getProduct(prodId).subscribe({
        next: response => {
          this.product.set(response)
          this.breadCrumbService.set('@productDetails', this.product()?.name!);
        },
        error: error => console.log(error)

      })
    }
  }

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }
}
