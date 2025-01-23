import { Component, inject } from '@angular/core';
import { Student } from '../../../models/item.model';
import { ItemService } from '../../../services/item.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ItemService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  filteredItems: Student[] = [];

  private itemService = inject(ItemService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // const state = this.route.data.subscribe((data) => {
    //   console.log('Data:', data);
    // });
    const navigation = this.route.root.snapshot;
    this.filteredItems = history.state.items || [];
    console.log('Received items:', this.filteredItems);
   
  }
}
