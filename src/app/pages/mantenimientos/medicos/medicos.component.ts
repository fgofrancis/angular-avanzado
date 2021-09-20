import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos:Medico[] = [];
  public cargando:boolean = true;
  private imgSubs!:Subscription;

  constructor(private _medicoService:MedicoService,
              private _modalImagenService:ModalImagenService,
              private _busquedaService: BusquedasService) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedico();
   
    this.imgSubs = this._modalImagenService.nuevaImagen
    .pipe( delay(100) )
    .subscribe( img => this.cargarMedico() );
    
  }

  cargarMedico(){
   // this._medicoService
   this.cargando = true;
   this._medicoService.cargarMedicos()
     .subscribe( medicos => {
       this.cargando = false;
       this.medicos = medicos;
      //  console.log(medicos);
     });
  }

  abrirModal(medico:Medico){
    this._modalImagenService.abrirModal('medicos',medico._id!,medico.img);
  }
  
  buscar(termino:string){
      
    if(termino.length === 0 ){
      return this.cargarMedico();
    }

   this._busquedaService.buscar('medicos',termino)
      .subscribe( resultados => {
        this.medicos = resultados;
      });
}
borrarMedico(medico: Medico){
 
  Swal.fire({
    title: 'Borrar médico?',
    text: `Está a punto de borrar a ${medico.nombre}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      this._medicoService.borrarMedico(medico._id!)
        .subscribe(resp => {
          this.cargarMedico();
          Swal.fire(
            'Médico borrado',
            `${ medico.nombre } fue eliminado correctamente`,
            'success'
          )}
        );
    }
  })
}

}
