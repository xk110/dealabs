import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCommentComponent } from './deal-comment.component';

describe('DealCommentComponent', () => {
  let component: DealCommentComponent;
  let fixture: ComponentFixture<DealCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
