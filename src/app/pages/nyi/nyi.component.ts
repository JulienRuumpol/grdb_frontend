import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nyi',
  imports: [MatIcon],
  templateUrl: './nyi.component.html',
  styleUrl: './nyi.component.css'
})
export class NyiComponent {
  constructor(private _router: Router) { }

  navigateToLoginScreen() {
    this._router.navigate(['login'])

  }

}
