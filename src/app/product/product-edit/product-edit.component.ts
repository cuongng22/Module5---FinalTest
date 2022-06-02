import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  book: Product = {};

  constructor(private bookService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getBookById(id);
    });
  }


  bookForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });

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

  ngOnInit() {
  }

  submitEdit() {
    this.bookService.editBook(this.book.id, this.bookForm.value).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }

  private getBookById(id) {
    this.bookService.getBookById(id).subscribe(bookBE => {
      this.book = bookBE;
      this.idControl.setValue(this.book.id);
      this.titleControl.setValue(this.book.title);
      this.authorControl.setValue(this.book.author);
      this.descriptionControl.setValue(this.book.description);
    });
  }

}
