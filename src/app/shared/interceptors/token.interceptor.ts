import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor started for req' + JSON.stringify(req))

  //retrieve token  
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW5AamFuLm5sIiwiaWF0IjoxNzQwMDYzNjMwLCJleHAiOjE3NDAwNjcyMzB9.9fJ-hXhwIbw2MZLfP79kpM0pllR6Lmkyuvd2AvoHLt_fHXBYwbpcUz655OGnu905up4W5d2lgB1vujnw4oWnCA'

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
