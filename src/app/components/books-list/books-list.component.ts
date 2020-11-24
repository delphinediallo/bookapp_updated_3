import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: any;
  currentBook = null;
  currentIndex = -1;
  title = '';

  constructor(private bookService: BookService) { } //changed from tutorialService

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void { //changed from retrieveTutorials
    this.bookService.getAllBooks()
      .subscribe(
        data => {
          this.books = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList(): void { 
    this.retrieveBooks();  //changed from retreiveTutorials
    this.currentBook = null; //changed from currentTutorial
    this.currentIndex = -1;
  }
  setActiveBook(book, index): void { //changed from setActiveTutorial
    this.currentBook = book;
    this.currentIndex = index;
  }
  removeAllBooks(): void { //changed from removeAllTutorials
    this.bookService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveBooks();
        },
        error => {
          console.log(error);
        });
  }
  searchTitle(): void {
    this.bookService.findByTitle(this.title) //changed tutorial
      .subscribe(
        data => {
          this.books = data; //changed tutorials
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}