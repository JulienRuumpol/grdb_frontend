import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService)

  let token = authService.getAccessToken()

  if (token) {
    let tokenDecoded: any = jwtDecode(token);
    if (tokenDecoded.role == 'Admin') return true
  }

  return false;
};
