import { Component, OnInit } from '@angular/core';
import { DiscussionService } from "../../services/discussion.service";

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.css']
})
export class DiscussionListComponent implements OnInit {

discussions: any;
currentDiscussion = null;
currentIndex = -1;
username = '';

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.retrieveDiscussions();
  }
  
  retrieveDiscussions(): void {
    this.discussionService.getAllDiscussions()
      .subscribe(
        data => {
          this.discussions = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveDiscussions();
    this.currentDiscussion = null;
    this.currentIndex = -1;
  }

  setActiveDiscussion(discussion, index): void {
    this.currentDiscussion = discussion;
    this.currentIndex = index;
  }

  removeAllDiscussions(): void {
    this.discussionService.deleteAllDiscussions()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveDiscussions();
        },
        error => {
          console.log(error);
        });
  }

  searchUsername(): void {
    this.discussionService.findDiscussionByUser(this.username)
      .subscribe(
        data => {
          this.discussions = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}