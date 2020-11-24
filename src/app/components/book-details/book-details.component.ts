import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  currentBook = null;
  message = '';

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getAllBooks();
    //this.getBook(this.route.snapshot.paramMap.get('id'));
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe(
      data => { this.currentBook = data },
      err => console.log(err),
      () => console.log('finished loading')
    );
  }

  getBook(id): void {
    this.bookService.getOneBook(id)
      .subscribe(
        data => {
          this.currentBook = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  //removed published   
updateBook(): void {
  this.bookService.update(this.currentBook.id, this.currentBook)
    .subscribe(
      response => {
        console.log(response);
        this.message = 'The book was updated successfully!';
      },
      error => {
        console.log(error);
      });
  }
deleteBook(): void {
  this.bookService.delete(this.currentBook.id)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/books']);// changed from /tutorials
      },
      error => {
        console.log(error);
      });
  }

}
