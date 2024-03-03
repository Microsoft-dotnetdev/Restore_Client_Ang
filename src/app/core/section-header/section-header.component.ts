import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [BreadcrumbModule, CommonModule],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  breadcrumbService = inject(BreadcrumbService);
}
