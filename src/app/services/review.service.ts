import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Review } from '../models/dto/Review.modal';
import { UpdateReview } from '../models/updateReview.modal';
import { AddReviewDto } from '../models/dto/AddReview.dto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  appurl: string = 'http://localhost:8080/review/'
  reviewsSubject = new BehaviorSubject<Review[]>([]);
  canAddReviewSubject = new BehaviorSubject<Boolean>(false);

  constructor(private http: HttpClient) { }


  getReviewByGame(gameId: Number): Observable<Review[]> {
    return this.http.get<Review[]>(this.appurl + gameId)
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(this.appurl + reviewId);
  }

  updateReview(reviewId: Number, newDescription: UpdateReview): Observable<Review> {
    return this.http.put<Review>(this.appurl + reviewId, newDescription)
  }

  addReview(addReviewDto: AddReviewDto): Observable<Review> {
    return this.http.post<Review>(this.appurl, addReviewDto)

  }
}
