import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostEditorComponent } from './components/blog-post-editor/blog-post-editor.component';
import { BlogPostViewerComponent } from './components/blog-post-viewer/blog-post-viewer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddDiscussionComponent } from './components/add-discussion/add-discussion.component';
import { DiscussionDetailsComponent } from './components/discussion-details/discussion-details.component';
import { DiscussionListComponent } from './components/discussion-list/discussion-list.component';
import { ListReviewsComponent } from './components/list-reviews/list-reviews.component';
import { NewReviewFormComponent } from './components/new-review-form/new-review-form.component';
import { ReviewMenuComponent } from './components/review-menu/review-menu.component';
import { NewsService } from './services/news.service';
import { ReviewService } from './services/review.service';

const appRoutes: Routes = [
  {
    path:'', //default component
    component: HomePageComponent },
  {
    path:'home', //home page
    component: HomePageComponent },
  {
    path:'books', //view all books
    component: BooksListComponent },
  {
    path:'discussions', //view all discussions
    component: DiscussionListComponent },
  {
    path:'news', //view all news
    component: BlogPostViewerComponent },
  {
    path:'listReviews', //when reviews listed
    component: ListReviewsComponent },
  {
    path:'books/add', //add book
    component: AddBookComponent },
  {
    path:'discussions/add', //add discussion
    component: AddDiscussionComponent },
  {
    path:'news/add', //add news post
    component: BlogPostEditorComponent },
  {
    path:'addReview', //when reviews added 
    component: NewReviewFormComponent  },
  {
    path:'news/edit/:_id', //edit news post
    component: BlogPostEditorComponent },
  {
    path:'editReview/:_id', //when reviews edited 
    component: NewReviewFormComponent},
  {
    path:'discussions/edit/:_id', //edit discussion
    component: DiscussionDetailsComponent },
  { 
    path:'books/edit/:_id', //edit book
    component: BookDetailsComponent },
  {
    path: '**', //when path cannot be found
    component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BlogPostEditorComponent,
    BlogPostViewerComponent,
    NotFoundComponent,
    AddBookComponent,
    BookDetailsComponent,
    BooksListComponent,
    HomePageComponent,
    AddDiscussionComponent,
    DiscussionDetailsComponent,
    DiscussionListComponent,
    ListReviewsComponent,
    NewReviewFormComponent,
    ReviewMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NewsService, ReviewService],
  bootstrap: [AppComponent]
})

export class AppModule { }
