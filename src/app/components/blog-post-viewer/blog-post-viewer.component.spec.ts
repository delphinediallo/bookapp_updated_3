import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostViewerComponent } from './blog-post-viewer.component';

describe('BlogPostViewerComponent', () => {
  let component: BlogPostViewerComponent;
  let fixture: ComponentFixture<BlogPostViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
