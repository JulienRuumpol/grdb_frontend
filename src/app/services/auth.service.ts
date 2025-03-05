import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, tap } from 'rxjs';
import { LoginDto } from '../models/dto/login.dto';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appurl = 'http://localhost:8080/auth'

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN'
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN"
  private loggedUser?: String;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isRefreshing = false;
  refreshSubject = new BehaviorSubject<string | null>(null); // Hold pending requests

  constructor(private http: HttpClient, private router: Router, private translateService: TranslateService) { }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(this.appurl + "/login", loginDto).pipe(
      tap((resp: any) => this.loginUserIntoApp(loginDto.email, resp))
    )
  }


  //todo rename method
  private loginUserIntoApp(email: any, token: any) {
    this.loggedUser = email,
      this.storeAccesToken(token.accessToken)
    this.storeRefreshToken(token.refreshToken)
    this.isAuthenticatedSubject.next(true)
  }

  private storeAccesToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token)
  }

  private storeRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN, token)
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN)
  }
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN)
  }

  logout() {
    localStorage.removeItem(this.ACCESS_TOKEN)
    localStorage.removeItem(this.REFRESH_TOKEN)
    this.isAuthenticatedSubject.next(false)
    this.router.navigate(['login'])
  }

  inactiveLogout() {
    localStorage.removeItem(this.ACCESS_TOKEN)
    localStorage.removeItem(this.REFRESH_TOKEN)
    this.isAuthenticatedSubject.next(false)
    this.router.navigate(['login'])
    this.translateService.get('login.InactiveLogoutMessage', { value: 'InactiveLogoutMessage' }).subscribe((translation: string) => {
      alert(translation)
    })


  }

  //  implement a call to get current authenticated user
  getCurrentAuthenticatedUser() {

  }
  isLoggedIn() {
    return !!localStorage.getItem(this.ACCESS_TOKEN)
  }

  isTokenExpired() {
    const token = localStorage.getItem(this.ACCESS_TOKEN)

    if (!token) return true;

    const decoded = jwtDecode(token)
    if (!decoded.exp) return true
    const expirationDate = decoded.exp * 1000
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken(): Observable<string> {

    if (!this.isRefreshing) {
      this.isRefreshing = true;

      const refreshToken = this.getRefreshToken();

      const authHeader = new HttpHeaders({
        Authorization: `Bearer ${refreshToken}`, // Include refresh token in header
      });

      return this.http.get<{ accessToken: string }>(this.appurl + '/refresh', {
        headers: authHeader
      }).pipe(
        tap((response) => {
          this.storeAccesToken(response.accessToken);
          this.refreshSubject.next(response.accessToken);
        }),
        map(response => response.accessToken),
        finalize(() => {
          this.isRefreshing = false
        })// Extract the string token
      );
    }
    return new Observable<string>(); // Prevent multiple refresh calls
  }
}
