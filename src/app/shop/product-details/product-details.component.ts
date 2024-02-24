import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product = signal<Product | null>(null)
  @Input('id') productId?: string;
  shopService = inject(ShopService)

  ngOnInit(): void {
    //console.log(this.productId);
    this.loadProduct();
  }

  loadProduct() {
    if (this.productId) {
      const prodId = Number(this.productId);
      this.shopService.getProduct(prodId).subscribe({
        next: response => this.product.set(response)
      })
    }
  }
}
