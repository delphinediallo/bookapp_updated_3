import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostEditorComponent } from './blog-post-editor.component';

describe('BlogPostEditorComponent', () => {
  let component: BlogPostEditorComponent;
  let fixture: ComponentFixture<BlogPostEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
