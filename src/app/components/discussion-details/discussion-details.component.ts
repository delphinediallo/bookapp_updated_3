import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../../services/discussion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.css']
})
export class DiscussionDetailsComponent implements OnInit {
currentDiscussion = null;
message = '';

  constructor(
    private discussionService: DiscussionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getDiscussion(this.route.snapshot.paramMap.get('id'));
  }

  getDiscussion(id): void {
    this.discussionService.getOneDiscussion(id)
      .subscribe(
        data => {
          this.currentDiscussion = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateRead(status): void {
    const data = {
      username: this.currentDiscussion.title,
      postn: this.currentDiscussion.postn,
      bookn: this.currentDiscussion.bookn,
      post: this.currentDiscussion.post,
      read: status
    };

    this.discussionService.updateDiscussion(this.currentDiscussion.id, data)
      .subscribe(
        response => {
          this.currentDiscussion.read = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateDiscussion(): void {
    this.discussionService.updateDiscussion(this.currentDiscussion.id, this.currentDiscussion)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The discussion post has updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteDiscussion(): void {
    this.discussionService.deleteOneDiscussion(this.currentDiscussion.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/discussions']);
        },
        error => {
          console.log(error);
        });
  }
}