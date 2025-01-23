import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, Student } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getItems(page: number = 1, limit: number = 10): Observable<PaginatedResponse> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<PaginatedResponse>(this.apiUrl + '/students', { params });
  }

  getItem(id: any): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/student/${id}`);
  }

  createItem(item: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/student`, item);
  }

  updateItem(id: number, item: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/student/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/student/${id}`);
  }

 filter (name: string): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/students/filter/${name}`);
  }
}
