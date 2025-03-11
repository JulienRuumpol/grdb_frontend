import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-role',
  imports: [],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.css'
})
export class UserRoleComponent implements OnInit {

  constructor(private userService: UserService) {

    let users;

  }
  ngOnInit(): void {

    console.log('ngonint trigged for stuff ')
    console.log("getting users ")


    this.userService.getAllUsers().subscribe(response => {
      let users = response

      console.log(users)

    })

    let getUsers = this.userService.getAllUsers()


  }






}
