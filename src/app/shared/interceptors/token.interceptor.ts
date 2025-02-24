import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  //retrieve token  
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW5AamFuLm5sIiwiaWF0IjoxNzQwMzg1MjI3LCJleHAiOjUzNDAzODUyMjd9.4bjc_hljwNBACmCPbiNYbwWzvoP72afl1_MovfIW5L9SEqxT3l3ml6vvcgMqnUu3MHNevfFdrdsYXUcQ3B_I3A'

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
