import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-review-form',
  templateUrl: './new-review-form.component.html',
  styleUrls: ['./new-review-form.component.css']
})
export class NewReviewFormComponent implements OnInit {
  @Input() username: string;
  @Input() bookTitle: string;
  @Input() rating: number;
  @Input() comment: string;
  public mode = 'Add'; //default mode
  private id: string; //review ID

  onSubmit() {
    console.log("You submitted: " + this.username + " " + this.bookTitle + " " + this.rating + " " + this.comment);
    if (this.mode == 'Add')
      this._myService.addReviews(this.username, this.bookTitle, this.rating, this.comment);
    if (this.mode == 'Edit')
      this._myService.updateReview(this.id, this.username, this.bookTitle, this.rating, this.comment);
    this.router.navigate(['/listReviews']);
  }
 // initialize the call using ReviewService
  constructor(private _myService: ReviewService, private router: Router, public route: ActivatedRoute) { }
  
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
       if (paramMap.has('_id'))
         { this.mode = 'Edit'; /*request had a parameter _id */ 
           this.id = paramMap.get('_id');}
       else {this.mode = 'Add';
           this.id = null; }
     });

  }
}