import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbar } from '@angular/material/toolbar'
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/dto/login.dto';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login-page',
  imports: [FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbar,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  logindata: LoginDto = new LoginDto('', '')
  displayEmailError: Boolean = false
  displayPasswordError: Boolean = false
  displayAuthError: Boolean = false
  isLoggingIn: Boolean = false

  loginForm = new FormGroup({
    email: new FormControl<String>('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl<String>('', [
      Validators.required
    ])
  })


  constructor(private authService: AuthService, private _router: Router) {
  }

  onSubmit() {
    // check for errors
    if (this.areErrorsPresent()) return;
    this.removeInputErrors();

    this.logindata.email = this.loginForm.value.email ? this.loginForm.value.email : ''
    this.logindata.password = this.loginForm.value.password ? this.loginForm.value.password : ''

    this.isLoggingIn = true
    this.authService.login(this.logindata).subscribe({
      next: (v) => {
        this._router.navigate(["home"])



        let token = jwtDecode(v.token);
        const isExpired = token && token.exp ? token.exp < Date.now() / 100 : false;

        console.log('is epxred' + isExpired)
        if (isExpired) {
          console.log('token is not expired' + token.exp)
        } else {
          console.log('token is exp expired')
        }

        console.log('login result is ' + JSON.stringify(v))
        // console.log('expires at ' + expiresAt)
        // localStorage.setItem('token', v.token)
        // localStorage.setItem('expires_at', expiresAt)


      },
      error: (e) => {
        this.displayAuthError = true
        this.isLoggingIn = false
      },
      complete: () => {
        this.isLoggingIn = false
      }
    })
  }

  removeInputErrors() {
    this.displayEmailError = false;
    this.displayPasswordError = false;
    this.displayAuthError = false;
  }

  areErrorsPresent(): Boolean {
    this.removeInputErrors();
    let errorPresent: Boolean = false;
    if (!this.loginForm.controls.email.valid) {
      this.displayEmailError = true;
      errorPresent = true
    }
    if (!this.loginForm.controls.password.valid) {
      this.displayPasswordError = true;
      errorPresent = true
    }
    return errorPresent;
  }

}
function moment() {
  throw new Error('Function not implemented.');
}

