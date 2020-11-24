import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMenuComponent } from './review-menu.component';

describe('ReviewMenuComponent', () => {
  let component: ReviewMenuComponent;
  let fixture: ComponentFixture<ReviewMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

