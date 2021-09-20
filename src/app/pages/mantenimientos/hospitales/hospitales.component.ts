import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales:Hospital[]= [];
  public cargando:boolean = true;

  public imgSubs!: Subscription;
  
  constructor(private _hostipalService:HospitalService,
              private _modalImagenService:ModalImagenService,
              private _busquedaService:BusquedasService) { }
  
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  ngOnInit(): void {
   
    this.cargarHospitales();
  
    this.imgSubs = this._modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarHospitales() );
  }

  buscar(termino:string){
      
    if(termino.length === 0 ){
      return this.cargarHospitales();
    }

   this._busquedaService.buscar('hospitales',termino)
      .subscribe( resultados => {
        this.hospitales = resultados;
      });
}

  cargarHospitales(){
     
    this.cargando = true;
    this._hostipalService.cargarHospitales()
        .subscribe(hospitales =>{
          this.cargando = false;
          console.log(hospitales)
          this.hospitales = hospitales;
        })
  }

  guardarCambio(hospital:Hospital){
     this._hostipalService.actualizarHospital(hospital._id!,hospital.nombre)
       .subscribe(resp =>{
         Swal.fire('Actualizado',hospital.nombre,'success');
       });
  }

  eliminarHospital(hospital:Hospital){
    this._hostipalService.borrarHospital(hospital._id!)
      .subscribe(resp =>{
        this.cargarHospitales();
        Swal.fire('Borrado',hospital.nombre,'success');
      });
 }

 async abrirSweetAlert(){
  const {value = ''} = await Swal.fire<string>({
    title: 'Crear hospital',
    text:'Ingrese el nombre del nuevo hospital',
    input: 'text',
    inputPlaceholder: 'Nombre del hospital',
    showCancelButton: true,
  })
  if (value.trim().length > 0){
    this._hostipalService.crearHospital(value!)
      .subscribe( (resp: any) =>{
        this.hospitales.push(resp.hospital)
      })
  }
   
 }
 abrirModal(hospital:Hospital){
  this._modalImagenService.abrirModal('hospitales',hospital._id!,hospital.img);
 }

}
