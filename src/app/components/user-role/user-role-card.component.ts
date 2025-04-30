import { Component, Input, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { UserService } from '../../services/user.service';

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
    MatSpinner,
    MatSelect,
    MatFormFieldModule

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.roleControl.patchValue({
      id: this.user.role.id,
      name: this.user.role.name
    })
  }

  updateUserRole() {

    if (this.roleControl.valid) {

      this.isSaving = true
      this.userService.updateRole(this.user.id, this.roleControl.value).subscribe({
        next: (v: User) => {
          this.user.role = v.role
        },
        error: (e) => {
          console.log('error updating role at ' + JSON.stringify(e))

        },
        complete: () => {
          this.isSaving = false
        }
      })

    }
  }
}
