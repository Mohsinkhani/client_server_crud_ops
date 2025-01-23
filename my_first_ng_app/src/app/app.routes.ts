import { Routes } from '@angular/router';
import { ReadItemsComponent } from './components/read-items/read-items.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { SearchComponent } from './components/read-items/search/search.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ReadItemsComponent },
    { path: 'home/:name', component: ReadItemsComponent },
    { path: 'filter', component: SearchComponent, data: { items: [] } },
    { path: 'create', component: CreateItemComponent },
    { path: 'update/:id', component: UpdateItemComponent },
    { path: 'delete/:id', component: DeleteItemComponent },
    { path: '**', redirectTo: 'home' }
];
