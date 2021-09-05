import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observer, PartialObserver, Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/service/token-storage-service.service';
import { Comment } from '../comment-model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-deal-comment',
  templateUrl: './deal-comment.component.html',
  styleUrls: ['./deal-comment.component.scss']
})
export class DealCommentComponent implements OnInit {

  @Input() idDeal: string;
  comment: string;
  comments: Comment[] = [];
  isLoggedIn = false;
  public commentForm: FormGroup;
  public autoResize: boolean = true;
  first = 0;
  rows = 10;
  private dealSubscription: Subscription;
  private commentSubscription: Subscription;

  constructor(
    public fb: FormBuilder,
    private messageService: MessageService,
    private commentService: CommentService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.commentForm = this.fb.group({
      comment: ['']
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
          console.log(JSON.stringify(err));
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'Bravo', detail: 'Commentaire ajouté', life: 5000 });
          this.ngOnInit();
        }
      };

      this.dealSubscription = this.commentService.create(commentToCreate).subscribe(commentObserver);

    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Commentaire non validé', life: 5000 });
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
