import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book = { //changed from tutorial
    title: '',
    author: '', //changed from description
    year: '', //added
    genre: '' //added
    //removed published
  };
  submitted = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  saveBook(): void { //all below chaged to book
    const data = {
      title: this.book.title,
      author: this.book.author,
      year: this.book.year, //added
      genre: this.book.genre, //added
    };

    this.bookService.create(data) //changed from tutorialService
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
        
      //after submit, set submitted to true  
      this.submitted = true;
  }

  newBook(): void { //changed from newTutorial
    this.submitted = false;
    this.book = { //changed from this.tutorial
      title: '',
      author: '', //changed from description
      year: '', //added
      genre: '' //added
      //removed published    
    };
  }

}
