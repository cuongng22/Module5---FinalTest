import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Product} from '../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  books: Product[] = [];

  constructor(private http: HttpClient) {
  }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/books`);
  }

  getBookById(id): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/books/${id}`);
  }

  createBook(book) {
    return this.http.post(`${API_URL}/books`, book);
  }

  editBook(id, book) {
    return this.http.put<Product>(`${API_URL}/books/${id}`, book);
  }

  deleteBook(id): Observable<Product> {
    return this.http.delete<Product>(`${API_URL}/books/${id}`);
  }
}
