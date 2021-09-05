import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Deal } from './deal-model';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private dealUrl = 'api/deals';

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<Deal> {

    return this.http.get<Deal>(this.dealUrl + '/' + id).pipe(
      tap(data => console.log('deal: ' + JSON.stringify(data)))
    );
  }

  getAll(): Observable<Deal[]> {
    return this.http.get<Deal[]>(this.dealUrl, {
      params: new HttpParams()
    }).pipe(
      map(res => res)).pipe(
        tap(res => console.log('getAll: ' + JSON.stringify(res)))
      );
  }

  create(dealToCreate: Deal): Observable<Deal> {
    return this.http.post<Deal>(this.dealUrl, dealToCreate).pipe(
      tap(data => console.log('deal created: ' + JSON.stringify(data)))
    );
  }

}