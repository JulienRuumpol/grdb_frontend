import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Review } from '../models/dto/Review.modal';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  appurl: string = 'http://localhost:8080/review/'
  reviewsSubject = new BehaviorSubject<Review[]>([]);

  constructor(private http: HttpClient) { }


  getReviewByGame(gameId: Number): Observable<Review[]> {
    return this.http.get<Review[]>(this.appurl + gameId)
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(this.appurl + reviewId);
  }
}
