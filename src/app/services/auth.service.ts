import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, tap } from 'rxjs';
import { LoginDto } from '../models/dto/login.dto';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appurl = 'http://localhost:8080/auth'

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN'
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN"
  loggedUserEmail: string = ""
  loggedInUserInformation: any = ''
  isAuthenticatedSubject = new BehaviorSubject<any>(false);

  isRefreshing = false;
  refreshSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router, private translateService: TranslateService, private userService: UserService) { }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(this.appurl + "/login", loginDto).pipe(
      tap((resp: any) => this.loginUserIntoApp(loginDto.email, resp))
    )
  }

  private loginUserIntoApp(email: any, token: any) {
    this.loggedUserEmail = email
    this.storeAccesToken(token.accessToken)
    this.storeRefreshToken(token.refreshToken)
    this.loggedInUserInformation = jwtDecode(token.accessToken)
    this.isAuthenticatedSubject.next(email)
  }

  refreshLoggedInUserInformation() {
    let token: any = this.getAccessToken()

    if (token != null) {
      this.loggedInUserInformation = jwtDecode(token)
    }

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
    this.removeUserAuthenticationDetail()
    this.router.navigate(['login'])
    this.loggedInUserInformation = ""
  }

  inactiveLogout() {
    localStorage.removeItem(this.ACCESS_TOKEN)
    localStorage.removeItem(this.REFRESH_TOKEN)
    this.isAuthenticatedSubject.next(false)
    this.removeUserAuthenticationDetail()
    this.router.navigate(['login'])
    this.translateService.get('login.InactiveLogoutMessage', { value: 'InactiveLogoutMessage' }).subscribe((translation: string) => {
      alert(translation)
    })
  }

  removeUserAuthenticationDetail() {
    this.userService.authenticatedSubjectDetails.next('')
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
        Authorization: `Bearer ${refreshToken}`,
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
        })//  
      );
    }
    return new Observable<string>();
  }
}
