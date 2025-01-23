import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Student } from '../../models/item.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-item',
  standalone: true,
  providers: [ItemService],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  item: Student = { _id: 0, name: '', shape: '' };

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.itemService.getItem(id).subscribe((data: Student) => {
      this.item = data;
    });
  }

  updateItem(): void {
    this.itemService.updateItem(this.item._id!, this.item).subscribe({
      next: (res: any) => {
        if (res) {
          console.log('Item updated successfully!');
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        if (error.status === 200) {
          this.router.navigate(['/home']);
        }
        console.error(error);
      },
      complete: () => {
        console.log('Item update operation completed.');
      }
    });
  }
}
