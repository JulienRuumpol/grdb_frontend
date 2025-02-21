import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor started for req' + JSON.stringify(req))

  //retrieve token  
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW5AamFuLm5sIiwiaWF0IjoxNzQwMTMwMTExLCJleHAiOjUzNDAxMzAxMTF9.SMXg-bupGlDdEEWIpPq0AnrxkhRT-ErYZEIVOhENJjaJOM43MwsH5Dvper0gQjCaoAOjX4Qk1_kVCllGJCiRzA'

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
