import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
 
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class ReviewService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data 
    getReviews() {
        return this.http.get('http://localhost:8000/reviews');
    }
    // Uses http.post() to post data 
addReviews(username: string, email: string,  rating: number, comment: string) {
    this.http.post('http://localhost:8000/reviews',{ username, email, rating, comment })
  .subscribe((responseData) => {
     console.log(responseData);
   }); 
}
 
deleteReview(reviewId: string) {
    this.http.delete("http://localhost:8000/reviews/" + reviewId)
      .subscribe(() => {
          console.log('Deleted: ' + reviewId);
      });
      location.reload();
 
  }
 
updateReview(reviewId: string,username: string, email: string, rating: number, comment: string) {
    //request path http://localhost:8000/students/5xbd456xx 
    //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/reviews/" 
             + reviewId,{ username, email, rating, comment})
          .subscribe(() => {
              console.log('Updated: ' + reviewId);
          });
          
    }
}
