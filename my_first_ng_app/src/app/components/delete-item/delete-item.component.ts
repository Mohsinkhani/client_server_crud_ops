import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-item',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ItemService],
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {
  id: any = 0;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  deleteItem(): void {
    this.itemService.deleteItem(this.id).subscribe({
      next: (res: any) => {
        if (res) {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        if (error.status === 200) {
          this.router.navigate(['/home']);

        }
        console.error(error);
      }
    });
  }
}
