import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/dto/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appurl = 'http://localhost:8080/auth/login'

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(this.appurl, loginDto);
  }
}
