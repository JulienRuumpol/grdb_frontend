import { Component, inject, Input } from '@angular/core';
import { Review } from '../../../models/dto/Review.modal';
import { MatCard } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { ReviewService } from '../../../services/review.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent } from '@angular/material/dialog';
import { DeleteReviewDialogComponent } from './delete_review_confirm_dialog/delete-review-dialog/delete-review-dialog.component';

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
export class ReviewComponent {
  dialog = inject(MatDialog);

  @Input() review!: Review

  constructor(private reviewService: ReviewService) { }

  openDeleteDialog() {
    console.log('opening stuff')
    this.dialog.open(DeleteReviewDialogComponent, {
      data: {
        review: this.review
      }
    })

  }



  checkIsUserAdminOrIdEqualToReview() {

  }


}
