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

  username: String = "nyi"

  constructor(private _router: Router, private translate: TranslateService, private authservice: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    // let token: string = localStorage.getItem('ACCES_TOKEN') || "nyis"

    // let decodedToken = jwtDecode(token);

    // this.username = decodedToken.iss || "blaba"




    this.userService.authenticatedSubjectDetails.subscribe(user => {
      this.username = user.userName
      console.log('registered new username info ' + user.userName)
      console.log('registered new username info ' + JSON.stringify(user))

    })
    // this.userService.getCurrentAuthenticatedUserInformation(this.authservice.loggedUserEmail)

  }

  navigateToUserRole() {
    // implement code to route to /userRole

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
    //insert logic to log out user
    // this._router.navigate(['logout'])

    this.authservice.logout();
    this._router.navigate(['login'])

  }

  switchLanguage(language: string) {
    this.translate.use(language);

    //todo update user call when Able to get user ID from localstorage
  }
}
