import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  standalone: true,
  imports: [],
  templateUrl: './paging-header.component.html',
  styleUrl: './paging-header.component.scss'
})
export class PagingHeaderComponent {
  @Input() pageNumber?: number;
  @Input() pageSize?: number;
  @Input() totalCount?: number;

  getPaginationDetail() {
    let str: string = '';
    if (this.pageNumber && this.pageSize && this.totalCount) {
      str += (this.pageNumber - 1) * this.pageSize + 1 + '-';
      str += this.pageNumber * this.pageSize > this.totalCount
        ? this.totalCount
        : this.pageNumber * this.pageSize

    }
    return str;
  }
}
