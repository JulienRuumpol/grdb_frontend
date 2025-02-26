import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatList } from '@angular/material/list'
import { MatListItem } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { jwtDecode } from "jwt-decode";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIcon,
    MatList,
    MatListItem,
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

  constructor(private _router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    let token: string = localStorage.getItem('token') || "nyis"

    let decodedToken = jwtDecode(token);

    this.username = decodedToken.iss || "blaba"


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
    alert('Not yet Implement');
    // this._router.navigate(['logout'])
  }

  switchLanguage(language: string) {
    this.translate.use(language);

    //todo update user call when Able to get user ID from localstorage
  }
}
