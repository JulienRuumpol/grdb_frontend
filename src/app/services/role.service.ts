import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  appurl: string = 'http://localhost:8080/role/'

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<Role[]> {


    return this.http.get(this.appurl).pipe(
      map((response: any) =>
        response.map((role: Role) => ({
          id: role.id,
          name: role.name
        }))
      )
    );
  }

  updateRole(userId: number, role: Role): Observable<any> {
    return this.http.put('http://localhost:8080/user/' + userId + '/role', role)
  }
}
