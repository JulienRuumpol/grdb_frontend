import { Component, inject, Input, OnInit } from '@angular/core';
import { Review } from '../../../models/dto/Review.modal';
import { MatCard } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { ReviewService } from '../../../services/review.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent } from '@angular/material/dialog';
import { DeleteReviewDialogComponent } from './delete_review_confirm_dialog/delete-review-dialog/delete-review-dialog.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-review',
  imports: [
    MatCard,
    MatTooltip,
    MatIcon,
    MatDialogContent

  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  canUserDeleteReview: boolean = false;
  dialog = inject(MatDialog);
  @Input() userId!: number;
  @Input() isAdmin!: boolean;


  @Input() review!: Review

  constructor(private reviewService: ReviewService, private authService: AuthService) { }
  ngOnInit(): void {
    console.log('user id ' + this.userId + "review user id " + this.review.userId)
  }

  openDeleteDialog() {
    console.log('opening stuff')
    this.dialog.open(DeleteReviewDialogComponent, {
      data: {
        review: this.review
      }
    })

  }


  isUserAdminOrIdEqualToReview() {
    let userId = this.authService.loggedInUserInformation.id
    let userRole = this.authService.loggedInUserInformation.role

    console.log("uiser id " + userId + " review userID " + this.review.userId + "uiser role " + userRole)
    if (userId.id === this.review.userId) {
      console.log('review ' + this.review.description + " is true")
      return true;
    } else {
      return false
    }

  }


}
