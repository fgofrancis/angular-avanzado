import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map} from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _usuarioService:UsuarioService,
               private router:Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this._usuarioService.validarToken()
        .pipe(
          tap(isAutenticado => {
            if (!isAutenticado){
              this.router.navigateByUrl('/auth/login');
            }
          })
        )
  }
  
}

