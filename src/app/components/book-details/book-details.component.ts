import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  currentBook = null;
  message = '';
  private id: string;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    //this.getBook(this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('_id')) { 
        this.id = paramMap.get('_id');
        this.getBook(this.id);
      }
      else {
        this.id = null;
      }
    });
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
  this.bookService.update(this.id, this.currentBook)
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
  this.bookService.delete(this.id)
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
