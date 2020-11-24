import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-blog-post-editor',
  templateUrl: './blog-post-editor.component.html',
  styleUrls: ['./blog-post-editor.component.css']
})
export class BlogPostEditorComponent implements OnInit {
  blogForm: FormGroup;
  resetButton = 'Reset Form';
  submitButton = 'Submit';

  @Input() postDate:string;
  @Input() postAuthor:string;
  @Input() postTitle:string;
  @Input() postContent:string;

  public mode ='add'; //default mode
  private id: string; //postID
  postData: any;
  
  constructor(private _myService: NewsService, builder: FormBuilder, 
    private router:Router, public route:ActivatedRoute) {

    this.blogForm = builder.group({
      postDate: [""],
      postAuthor: [""],
      postTitle: [""],
      postContent: [""]
    });
  }

  addPost() {
    if(this.mode == 'add')
      this._myService.addNewsPost(this.postDate, this.postAuthor, this.postTitle, this.postContent);
      console.log('New post submitted.');
      if(this.mode == 'edit')
      this._myService.updateNewsPost(this.id, this.postDate, this.postAuthor, this.postTitle, this.postContent);
      console.log('Post updated.');
    this.router.navigate(['/news']);
  }

  resetForm() {
    postDate: "";
    postAuthor: "";
    postTitle: "";
    postContent: "";
    console.log('Form reset.');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('_id')) { 
        this.mode = 'edit';
        this.id = paramMap.get('_id');
        this.loadPost(this.id);
      }
      else {
        this.mode = 'add';
        this.id = null;
      }
    });
  }

  //load post values to form
  loadPost(postId:string) {
    this._myService.getNewsPost(postId).subscribe(data => {
      this.postData = data;
      this.blogForm.controls['postDate'].setValue(this.postData['postDate']);
      this.blogForm.controls['postAuthor'].setValue(this.postData['postAuthor']);
      this.blogForm.controls['postTitle'].setValue(this.postData['postTitle']);
      this.blogForm.controls['postContent'].setValue(this.postData['postContent']);
    });
  }

}
