import { HttpInterceptorFn } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';



export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const helper = new JwtHelperService();
  const authService = inject(AuthService)

  //retrieve token  
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW5AamFuLm5sIiwiaWF0IjoxNzQwMzg1MjI3LCJleHAiOjUzNDAzODUyMjd9.4bjc_hljwNBACmCPbiNYbwWzvoP72afl1_MovfIW5L9SEqxT3l3ml6vvcgMqnUu3MHNevfFdrdsYXUcQ3B_I3A'



  // localStorage.setItem('token', token);

  if (localStorage.getItem('token')) {

  }

  const jwtToken = getJwtToken()

  if (jwtToken) {
    const newReq = req.clone({
      setHeaders: { Authorization: `Bearer ${jwtToken}` }
    });
    return next(newReq)
  }


  return next(req);
};


function getJwtToken(): string | null {
  return localStorage.getItem('JWT_TOKEN')
}



function handle403Error() {

}