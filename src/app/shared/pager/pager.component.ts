import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [PaginationModule, FormsModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss'
})
export class PagerComponent {
  @Input() totalCount?: number
  @Input() pageSize?: number
  @Input() currentPage?: number
  @Output() pageChanged = new EventEmitter<number>()

  onPagerChanged(event: any) {
    this.pageChanged.emit(event)
  }
}
