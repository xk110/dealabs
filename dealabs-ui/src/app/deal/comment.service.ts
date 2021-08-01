import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Comment } from './comment-model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

private commentUrl = 'api/v1/comments';

constructor(private http: HttpClient) {
}

getByIdDeal(idDeal: string): Observable<Comment[]> {

  return this.http.get<Comment[]>(this.commentUrl + '/' + idDeal).pipe(
    tap(data => console.log('comment: ' + JSON.stringify(data)))
  );
}

create(commentToCreate: Comment): Observable<Comment> {
  console.log("commentToCreate : " + JSON.stringify(commentToCreate));
  return this.http.post<Comment>(this.commentUrl, commentToCreate).pipe(
    tap(data => console.log('comment created: ' + JSON.stringify(data)))
  );
}

}