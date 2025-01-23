import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [ItemService],
  imports: [HttpClientModule],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarCollapsed = true;
  @Output() search = new EventEmitter<string>();

  constructor(private router: Router,
    private itemService: ItemService,

  ) { }

  navigate(routeName: string) {
    if (routeName === 'home') {
      this.router.navigate(['/home']);
    } else if (routeName === 'list') {
      this.router.navigate(['/create']);
    }
  }

  onSearch(searchTerm: string) {
    // Implement your search logic here
    console.log('Search term:', searchTerm);
    this.itemService.filter(searchTerm).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/filter'], { state: { items: data } }).then(() => {
          // Data is sent to the search component
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Complete');
      }
    });
  }
}
