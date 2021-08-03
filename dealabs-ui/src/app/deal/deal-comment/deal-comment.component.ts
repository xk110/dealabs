import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observer, PartialObserver, Subscription } from 'rxjs';
import { CommentService } from '../comment.service';
import { Comment } from '../comment-model';

@Component({
  selector: 'app-deal-comment',
  templateUrl: './deal-comment.component.html',
  styleUrls: ['./deal-comment.component.scss']
})
export class DealCommentComponent implements OnInit {

  @Input() idDeal: string;
  comment: string;
  comments: Comment[];
  public commentForm: FormGroup;
  public autoResize: boolean = true;
  first = 0;
  rows = 10;
  private dealSubscription: Subscription;
  private commentSubscription: Subscription;

  @ViewChild(FormGroupDirective, { static: true }) private formGroupDirective: FormGroupDirective;

  constructor(
    public fb: FormBuilder,
    private messageService: MessageService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {

    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]]
    });

    const commentObserver: PartialObserver<Comment[]> = {
      next: data => {
        this.comments = data;
      }
    };

    this.commentSubscription = this.commentService.getByIdDeal(this.idDeal)
      .subscribe(commentObserver);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.comments ? this.first === (this.comments.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.comments ? this.first === 0 : true;
  }


  updateDeal() {

    if (this.commentForm.valid) {
      const commentToCreate = {
        idDeal: this.idDeal,
        comment: this.commentForm.get('comment')?.value,
      } as Comment;

      const commentObserver: Observer<Comment> = {
        next: res => {
        },
        error: err => {
          for (const feedback of err.error.feedbacks) {
            this.messageService.add({
              key: 'globalMessage',
              severity: 'error',
              summary: 'update',
              detail: feedback.label ?
                feedback.label : 'error_during_update',
              life: 5000
            });
          }
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'update', detail: 'update_successful', life: 5000 });
          this.formGroupDirective.resetForm();
          this.ngOnInit();
        }
      };

      this.dealSubscription = this.commentService.create(commentToCreate).subscribe(commentObserver);

    } else {
      this.messageService.add({ severity: 'error', summary: 'update', detail: 'invalid_form', life: 5000 });
    }
  }

  ngOnDestroy() {
    if (this.dealSubscription) {
      this.dealSubscription.unsubscribe();
    }
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }

}
