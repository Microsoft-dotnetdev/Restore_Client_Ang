import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/layout/nav-bar/nav-bar.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Product } from './models/product';
import { Pagination } from './models/Pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  private http = inject(HttpClient);
  products: Product[] = [];
  pagination: Pagination | null = null;

  ngOnInit(): void {
    this.http.get<Product[]>('https://localhost:5001/api/products?pageSize=50', { observe: 'response' }).subscribe(
      {
        next: (res: HttpResponse<Product[]>) => {
          const paging = res.headers.get('pagination')
          if (paging)
            this.pagination = JSON.parse(paging);
          if (res.body)
            this.products = res.body;
        },
        error: (err) => {
          console.log(err);
        },
        complete() {
          console.log('Http request completed');

        },
      }
    )
  }

}
