import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario-model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde:number = 0;
  public cargando:boolean = true;

  constructor( private _usuarioService:UsuarioService,
               private _busquedaService:BusquedasService,
               private _modalImagenService:ModalImagenService) { }


  // Para evitar la fuga de memoria
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this._modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarUsuarios() );
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe(( {total, usuarios}) =>{
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }

  cambiarPagina(valor: number){
    this.desde += valor;
    
    if(this.desde < 0){
      this.desde = 0;
    } else if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino:string){
      
      if(termino.length === 0 ){
        return this.usuarios = this.usuariosTemp;
      }
 
     return this._busquedaService.buscar('usuarios',termino)
        .subscribe( (resultados: any) => {
          this.usuarios = resultados;
        });
  }

  eliminarUsuario(usuario:Usuario){

    if (usuario.uid === this._usuarioService.uid) {
        return Swal.fire('Error','No puede borrarse a si mismo','error');
    }
  
    Swal.fire({
      title: 'Borrar usurio?',
      text: `Está a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.eliminarUsurio(usuario)
          .subscribe(resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',`${ usuario.nombre } fue eliminado correctamente`,
              'success'
            )}
          );
      }
    })
    return true;
  }
  cambiarRole(usuario:Usuario){
   this._usuarioService.guardarUsuario(usuario)
       .subscribe( resp =>{
         console.log(resp);
       })
  }

  abrirModal(usuario:Usuario){
     this._modalImagenService.abrirModal('usuarios',usuario.uid!,usuario.img);
  }
}
