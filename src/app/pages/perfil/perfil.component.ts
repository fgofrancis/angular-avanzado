import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Usuario } from 'src/app/models/usuario-model';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup;
  public usuario:Usuario;
  public imagenSubir!:File;
  public imgTemp:any = '';

   constructor(private fb:FormBuilder,
              private _usuarioService:UsuarioService,
              private _fileUploadService:FileUploadService) {

    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
     nombre:[this.usuario.nombre,Validators.required],
     email:[this.usuario.email,[ Validators.required, Validators.email ]], 
    });
  }

  actualizarPerfil(){
    this._usuarioService.actulizarPerfil(this.perfilForm.value)
        .subscribe( () =>{
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire('Guardado','Cambios fueron guardados','success');
        }, (err) =>{
            console.log(err.error.msg);
            Swal.fire('Error',err.error.msg,'error');
        })
  }

  cambiarImagen(event:any){
    const file = event.target.files[0];
    this.imagenSubir = file;

    if(!file){ 
      return this.imgTemp = null;
    }
 
    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
      // console.log(reader.result);
    }
 
    //Esto hay q arreglarlo, 
    return true;

  }

  subirImagen(){
    this._fileUploadService
      .actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid!)
      .then( img =>{
         this.usuario.img = img; 
         Swal.fire('Guardado','Imagen actualizada exitosamente','success');
      }).catch( err =>{
        console.log(err);
        Swal.fire('Error','No se pudo subir la imagen','error');
      });
    
  }
}  
