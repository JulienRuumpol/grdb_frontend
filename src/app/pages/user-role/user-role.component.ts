import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-role',
  imports: [
    MatCard,
    MatIcon,
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    MatOption
  ],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.css'
})
export class UserRoleComponent implements OnInit {

  userRoleForm: FormGroup = new FormGroup({
    userId: new FormControl<Number>(0),
    role: new FormControl<Role>({ id: 0, name: "Basic" })
  })

  roleControl: FormControl = new FormControl<Role>({ id: 0, name: "Basic" })

  users: Array<User> = []
  roles: Array<Role> = []

  constructor(private userService: UserService, private roleService: RoleService) { }
  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(response => {
      this.users = response
    })

    this.roleService.getAllRoles().subscribe(response => {
      this.roles = response

      // fix why the selector isn't working
      console.log('response is  ' + response)
      console.log('roles is + ' + this.roles)
    })
  }

  updateUserRole(userId: number) {
    let formRole: Role = this.roleControl.value

    console.log(userId)
    console.log('roleform is ' + JSON.stringify(formRole))

    this.roleService.updateRole(userId, formRole).subscribe({
      next: (v) => {
        console.log('update response is ' + JSON.stringify(v))


      },
      error: (e) => {
        console.log('errro when updating user role at' + e)
      },
      complete: () => {
      }
    })

  }



}
