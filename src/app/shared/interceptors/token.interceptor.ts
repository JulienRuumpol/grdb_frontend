import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';



export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let authReq = req;
  let token = authService.getAccessToken()

  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  if (token) {
    authReq = addToken(authReq, token)
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authService, req, next);
      }
      return throwError(() => error);
    })
  );
}

const handle401Error = (authService: AuthService, request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  if (authService.isRefreshing) {
    return authService.refreshSubject.asObservable().pipe(
      take(1),
      switchMap((newToken) => {
        return next(request.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }));
      })
    );
  } else {
    return authService.refreshToken().pipe(
      switchMap((newToken: string) => {
        return next(request.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }));
      }),
      catchError((err) => {
        authService.inactiveLogout();
        return throwError(() => err);
      })
    );
  }
};

function addToken(req: HttpRequest<any>, token: string) {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}