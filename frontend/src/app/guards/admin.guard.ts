// src/app/guards/admin.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const tipo = localStorage.getItem('usuarioTipo');

  if (token && tipo === 'ADMIN') {
    return true;
  }

  return router.parseUrl('/login-admin');
};
