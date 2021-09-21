import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario-model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor( private _usuarioService:UsuarioService,
               private router:Router ) {

    this.usuario = _usuarioService.usuario;
   }

  logout(){
    this._usuarioService.logout();
  }

  buscar(termino: string){

    if(termino.length === 0){
      console.log('hxxxxx');
      this.router.navigateByUrl('/dashboard');
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);

  }
}
