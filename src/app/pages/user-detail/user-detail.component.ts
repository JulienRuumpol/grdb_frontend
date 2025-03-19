import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { Role } from '../../models/role.model';
import { UpdateUserDetails } from '../../models/update-user-detail.modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatSpinner,
    MatLabel,
    MatIcon
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  isSaving: boolean = false
  user: User | undefined;
  userRole: Role | undefined;
  userInfoForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.email,
      Validators.required
    ]),
    username: new FormControl<string>('', [
      Validators.required
    ]),
    firstname: new FormControl<string>('', [
      Validators.required
    ]),
    lastname: new FormControl<string>('',
      Validators.required
    ),
    role: new FormControl<string>({ value: '', disabled: true })
  })

  constructor(private router: Router, private authService: AuthService, private userService: UserService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let userId = this.authService.getStoredUserInformation().id

    if (userId) {
      this.userService.getUserById(userId).subscribe(response => {
        console.log('user response detail is ' + JSON.stringify(response))
        this.user = response

        console.log('user  is ' + JSON.stringify(this.user))

        console.log('username is' + this.user.username)
        console.log('lastname is' + this.user.lastName)
        console.log('roolename is' + this.user.role.name)

        this.userInfoForm.patchValue({
          email: this.user.email,
          username: this.user.username,
          firstname: this.user.firstName,
          lastname: this.user.lastName,
          role: this.user.role.name
        })
      })

    }
  }

  navToChangePasswordPage() {
    this.router.navigate(['changePassword'])
  }

  saveUserDetails() {
    let userId = this.authService.getStoredUserInformation().id
    if (this.userInfoForm.valid) {
      this.isSaving = true
      let updatedUserDetails: UpdateUserDetails = {
        username: this.userInfoForm.controls.username.value || '',
        email: this.userInfoForm.controls.email.value || '',
        firstname: this.userInfoForm.controls.firstname.value || '',
        lastname: this.userInfoForm.controls.lastname.value || ''
      }

      console.log('new updated user detail to be is ' + JSON.stringify(updatedUserDetails))

      this.userService.updateUserDetails(userId, updatedUserDetails).subscribe({
        next: (v) => {
          this.openSaveSuccesSnackbar()
          // this.isSaving = false

        },
        error: (e) => {
          console.log('error at user-detail page updating userdetails ' + JSON.stringify(e))

        },
        complete: () => {
          this.isSaving = false
        }
      })
    }



  }
  openSaveSuccesSnackbar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000
    })
  }


}
