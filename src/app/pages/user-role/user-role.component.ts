import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { MatSpinner } from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';
import { UserRoleCardComponent } from '../../components/user-role/user-role-card.component';

@Component({
  selector: 'app-user-role',
  imports: [
    MatCard,
    MatIcon,
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    MatSpinner,
    UserRoleCardComponent
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
  usersSubject = new BehaviorSubject<User[]>([])

  roles: Array<Role> = []
  private _snackBar = inject(MatSnackBar);


  constructor(private userService: UserService, private roleService: RoleService, public snackBar: MatSnackBar) { }
  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(response => {
      this.usersSubject.next(response)
    })

    this.roleService.getAllRoles().subscribe(response => {
      this.roles = response
      // fix why the selector isn't working
    })

    this.usersSubject.subscribe(v => {
      this.users = v
    })
  }



  openSaveSuccesSnackbar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000
    })
  }

}
