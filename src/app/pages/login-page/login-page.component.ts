import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbar } from '@angular/material/toolbar'
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/dto/login.dto';


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
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  logindata: LoginDto = new LoginDto('', '')

  loginForm = new FormGroup({
    email: new FormControl<String>('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl<String>('')
  })


  constructor(private authService: AuthService) {
  }

  onSubmit() {
    this.logindata.email = this.loginForm.value.email ? this.loginForm.value.email : ''
    this.logindata.password = this.loginForm.value.password ? this.loginForm.value.password : ''

    console.log(this.logindata)
    this.authService.login(this.logindata).subscribe(response => {
      console.log('heymom ')
    });

  }

}
