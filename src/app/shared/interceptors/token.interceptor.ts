import { HttpInterceptorFn } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';



export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const helper = new JwtHelperService();

  //retrieve token  
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW5AamFuLm5sIiwiaWF0IjoxNzQwMzg1MjI3LCJleHAiOjUzNDAzODUyMjd9.4bjc_hljwNBACmCPbiNYbwWzvoP72afl1_MovfIW5L9SEqxT3l3ml6vvcgMqnUu3MHNevfFdrdsYXUcQ3B_I3A'


  localStorage.setItem('token', token);


  if (localStorage.getItem('token')) {

  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
