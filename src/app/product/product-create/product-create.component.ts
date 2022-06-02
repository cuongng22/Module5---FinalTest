import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  books: Product[] = [];
  constructor(
    private booksService: ProductService,
    private router: Router
  ) { }
  bookForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });

  ngOnInit() {
  }

  submitCreate() {
    this.booksService.createBook(this.bookForm.value).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
