import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  books: Product[] = [];
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getALl();
  }
  getALl() {
    this.productService.getAll().subscribe(books => {
      this.books = books;
    });
  }
  delete(id) {
    this.productService.deleteBook(id).subscribe(() => {
      alert('okok');
    });
  }
}
