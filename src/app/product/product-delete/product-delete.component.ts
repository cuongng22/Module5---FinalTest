import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  book: Product = {};
  id: number;
  bookForm: FormGroup = new FormGroup({
    id: new FormControl(this.book.id),
    title: new FormControl(this.book.title),
    author: new FormControl(this.book.author),
    description: new FormControl(this.book.description),
  });
  constructor(
    private bookService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getBookById(id);
      this.id = id;
    });
  }
  get idControl() {
    return this.bookForm.get('id');
  }

  get titleControl() {
    return this.bookForm.get('title');
  }

  get authorControl() {
    return this.bookForm.get('author');
  }

  get descriptionControl() {
    return this.bookForm.get('description');
  }

  getBookById(id) {
    this.bookService.getBookById(id).subscribe(bookBE => {
      this.book = bookBE;
      this.idControl.setValue(this.book.id);
      this.titleControl.setValue(this.book.title);
      this.authorControl.setValue(this.book.author);
      this.descriptionControl.setValue(this.book.description);
    });
  }
  submitDelete() {
    this.bookService.deleteBook(this.id).subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
