import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { jwtDecode } from "jwt-decode";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIcon,
    MatToolbar,
    TranslateModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavBarComponent implements OnInit {

  username: String = ""
  isAdmin: boolean = false
  isLoggedIn: boolean = false

  constructor(private _router: Router, private translate: TranslateService, private authservice: AuthService, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.authenticatedSubjectDetails.subscribe(user => {

      this.authservice.refreshLoggedInUserInformation()

      this.username = this.authservice.loggedInUserInformation.username
      this.isLoggedIn = this.authservice.isLoggedIn()

      if (this.authservice.loggedInUserInformation.role == 'Admin') this.isAdmin = true

    })


    this.authservice.isAuthenticatedSubject.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = true
      }
      else {
        this.username = ""
        this.isAdmin = false
        this.isLoggedIn = false
      }


    })
    this.configureRefresh()

  }

  private configureRefresh() {
    this.isLoggedIn = this.authservice.isLoggedIn()
    this.username = this.authservice.loggedInUserInformation.username
    this.isLoggedIn = this.authservice.isLoggedIn()
    if (this.authservice.loggedInUserInformation.role == 'Admin') this.isAdmin = true

  }

  navigateToUserRole() {
    this._router.navigate(['userRole'])
  }

  navigateToHomeScreen() {
    //implement code to route to /home 
    this._router.navigate(['home'])

  }

  navigateToUserDetailScreen() {
    this._router.navigate(['account'])
  }
  logout() {
    this.authservice.logout();
    this._router.navigate(['login'])
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }


}
