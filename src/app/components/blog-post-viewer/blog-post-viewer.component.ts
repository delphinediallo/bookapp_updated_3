import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-blog-post-viewer',
  templateUrl: './blog-post-viewer.component.html',
  styleUrls: ['./blog-post-viewer.component.css']
})
export class BlogPostViewerComponent implements OnInit {

  //declare variable to hold response
  public news;

  //initialize the call using NewsService
  constructor(private _myService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }
  
  //method called OnInit
  getNews() {
    this._myService.getNews().subscribe(
      //read data and assign to public variable news
      data => { this.news = data },
      err => console.log(err),
      () => console.log('finished loading')
    );
  }

  onDelete(newsId:string) {
    this._myService.deleteNews(newsId);
    location.reload();
  }

}
