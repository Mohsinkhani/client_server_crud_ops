import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Student } from '../../models/item.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  providers: [ItemService],
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent {
  item: Student = {};

  constructor(
    private itemService: ItemService,
    private router: Router,
    
  ) {}

  createItem(): void {
    this.itemService.createItem(this.item).subscribe({
      next: () => {
        console.log('Item created successfully');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 200) {
          console.error('Item created successfully');
          this.router.navigate(['/home']);
        }
        console.error('There was an error!', error);
      },
    });
  }
}
