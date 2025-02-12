import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatList } from '@angular/material/list'
import { MatListItem } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-left-nav-bar',
  imports: [
    MatIcon,
    MatList,
    MatListItem,
    MatToolbar
  ],
  templateUrl: './left-nav-bar.component.html',
  styleUrl: './left-nav-bar.component.css'
})
export class LeftNavBarComponent {


  constructor(private _router: Router) { }

  navigateToUserRole() {
    // implement code to route to /userRole
    console.log('hi')

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

  switchLanguage() {
    //implement logic for switching language
    alert('Not yet Implement');
  }
}
