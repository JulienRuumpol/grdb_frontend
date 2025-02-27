import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from '../models/dto/login.dto';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appurl = 'http://localhost:8080/auth/login'

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private loggedUser?: String;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(this.appurl, loginDto).pipe(
      tap((resp: any) => this.doLoginUser(loginDto.email, resp.token))
    )
  }

  private doLoginUser(email: any, token: any) {
    this.loggedUser = email,
      this.storeJwtToken(token)
    this.isAuthenticatedSubject.next(true)
  }

  private storeJwtToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token)
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN)
    this.isAuthenticatedSubject.next(false)
  }

  // maybe implement a call to get current authenticated user?

  getCurrentAuthenticatedUser() {
    //call for getting user go to 16:00 in video

  }
  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN)
  }

  isTokenExpired() {
    const token = localStorage.getItem(this.JWT_TOKEN)

    if (!token) return true;

    const decoded = jwtDecode(token)
    if (!decoded.exp) return true
    const expirationDate = decoded.exp * 1000
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken() {
    //todo implement api call for refersighn 37:50 video
  }
}
