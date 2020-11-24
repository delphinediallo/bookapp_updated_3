import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {

  public reviews;
  //initialize the call using StudentService 
  constructor(private _myService: ReviewService) { }
  ngOnInit() {
    this.getReviews();
  }
  //method called OnInit
  getReviews() {
   this._myService.getReviews().subscribe(
      //read data and assign to public variable students
      data => { this.reviews = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
  onDelete(reviewId: string) {
    this._myService.deleteReview(reviewId);
  }

}


