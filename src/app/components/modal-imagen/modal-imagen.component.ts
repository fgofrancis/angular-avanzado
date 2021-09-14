import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!:File;
  public imgTemp:any = '';
   
  constructor(public _modalImagenService: ModalImagenService,
              public _fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this._modalImagenService.cerrarModal();
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
    }
 
    //Esto hay q arreglarlo, 
    return true;

  }

  subirImagen(){
    const id   = this._modalImagenService.id;
    const tipo = this._modalImagenService.tipo;

    this._fileUploadService
      .actualizarFoto(this.imagenSubir,tipo,id)
      .then( img =>{
            Swal.fire('Guardado','Imagen actualizada exitosamente','success');
            this._modalImagenService.nuevaImagen.emit(img);
            this.cerrarModal();
      }).catch( err =>{
        console.log(err);
        Swal.fire('Error','No se pudo subir la imagen','error');
      });
    
  }
}
