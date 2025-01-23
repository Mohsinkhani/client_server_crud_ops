import { Component, OnInit, forwardRef, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from '../../services/item.service';
import { PaginatedResponse, Student } from '../../models/item.model';

@Component({
  selector: 'app-read-items',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ItemService],
  templateUrl: './read-items.component.html',
  styleUrls: ['./read-items.component.css']
})
export class ReadItemsComponent implements OnInit {
  students: Student[] = [];
  filteredItems: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  private itemService = inject(ItemService);
  private router = inject(Router);
  totalPages: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems(this.currentPage, this.itemsPerPage).subscribe((data: PaginatedResponse) => {
      this.students = data.students;
      this.totalPages = Math.ceil(data.totalCount / this.itemsPerPage);

    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadItems();
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadItems();
    }
  }
}
