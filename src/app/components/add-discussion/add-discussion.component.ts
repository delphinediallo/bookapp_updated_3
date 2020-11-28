import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../../services/discussion.service';

@Component({
  selector: 'app-add-discussion',
  templateUrl: './add-discussion.component.html',
  styleUrls: ['./add-discussion.component.css']
})

export class AddDiscussionComponent implements OnInit {
discussion = {
  username: '',
  postn: '',
  bookn: '',
  post: '',
  read: false
};
submitted = false;

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
  }

  saveDiscussion(): void {
    const data = {
      username: this.discussion.username,
      postn: this.discussion.postn,
      bookn: this.discussion.bookn,
      post: this.discussion.post,
      read: this.discussion.read
    };

    this.discussionService.createDiscussion(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

      //after submit set submitted to true
      this.submitted = true;
  }

  newDiscussion(): void {
    this.submitted = false;
    this.discussion = {
      username: '',
      postn: '',
      bookn: '',
      post: '',
      read: false
    };
  }
}