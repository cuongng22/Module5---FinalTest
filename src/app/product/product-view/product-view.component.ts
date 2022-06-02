import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  book: Product = {};
  bookForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
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
  delete(id) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
