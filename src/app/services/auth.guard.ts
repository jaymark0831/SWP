import { inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const AuthGuard = () => {

    const authService = inject(AuthService);
    const router = inject(Router);
    
    if(authService.userData){
      return true;
    }

   return router.parseUrl('');
}
