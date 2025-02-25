import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  //retrieve token  
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW5AamFuLm5sIiwiaWF0IjoxNzQwNDcyNTIxLCJleHAiOjUzNDA0NzI1MjF9.vp9nI6SrOF1plOGMftTlE6SWCRkd92YGwC58K5ZgGHr8pg1WmYVWpvYTY0RNtauhHu7wpn_6gNlBysChxbRrFA'

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
