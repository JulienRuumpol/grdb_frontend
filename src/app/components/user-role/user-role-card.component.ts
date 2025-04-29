import { Component, Input, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-role-card',
  imports: [
    MatCard,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatOption,
    MatIcon,
    MatFormField,
    MatSpinner

  ],
  templateUrl: './user-role-card.component.html',
  styleUrl: './user-role-card.component.css'
})
export class UserRoleCardComponent implements OnInit {


  @Input() roles!: Role[];
  @Input() user!: User;
  isSaving: Boolean = false;

  userRoleForm: FormGroup = new FormGroup({
    userId: new FormControl<Number>(0),
    role: new FormControl<Role>({ id: 0, name: "Basic" })
  })

  roleControl: FormControl = new FormControl<Role>({ id: 0, name: "Basic" })

  ngOnInit(): void {
    console.log('user is ' + JSON.stringify(this.user))
    console.log('role is  ' + JSON.stringify(this.roles))
  }

  updateUserRole(userId: Number) {

  }
}
