import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const personalGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.getUsuario();

  if (usuario && usuario.perfil.toLowerCase() === 'personal') {
    return true; // ✅ apenas personal pode acessar
  }

  // Redireciona para login ou página de acesso negado
  return router.parseUrl('/acesso-negado'); 
};
