import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!:FormGroup;
  public hospitales:Hospital[]=[];
  public medicoSeleccionado?:Medico;
  public hospitalSeleccionado?: Hospital;
  
  constructor( private fb:FormBuilder,
               private _hospitalService:HospitalService,
               private _medicoService: MedicoService,
               private router:Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // usamos ahora desestructuración para elegir el parametro id de params
    this.activatedRoute.params
      .subscribe(({id}) =>{
          this.cargarMedico(id);
      });

    this.medicoForm = this.fb.group({
      nombre:['',Validators.required],
      hospital:['', Validators.required],
    });

    this.cargarHospitales();
      
    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId =>{
          this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId);
        })
  }

  cargarMedico(id:string){

    if(id === 'nuevo'){
      return;
    }
    this._medicoService.obtenerMedicoPorId(id)
        .pipe(
          delay(100)
        )
        .subscribe(medico =>{

           if( !medico){
             return this.router.navigateByUrl(`/dashboard/medicos`)
           }

          // const {nombre, hospital:{ _id }} = medico; //no me funciona
          const nombre = medico.nombre;
          const _id = medico.hospital?._id; 
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({nombre, hospital: _id})
          return;
        });
        
  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales()
        .subscribe((hospitales: Hospital[]) =>{
          this.hospitales = hospitales;
        });
  }

  guardarMedico(){

    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado){
      // Actualizar 
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this._medicoService.actualizarMedico(data)
         .subscribe(resp =>{
           Swal.fire('Actualizado',`${ nombre } Actualizado correctamente`, 'success');
         })
    }else{
      // Crear
      // Capturnando los valores del formulario
      //  console.log(this.medicoForm.value);
    
       this._medicoService.crearMedico(this.medicoForm.value)
         .subscribe( (resp:any) =>{
           console.log(resp);
           Swal.fire('Creado',`${ nombre } creado correctamente`, 'success');
           this.router.navigateByUrl(`/dashboard/medicos/${resp.medico._id}`)
         })
    }
  }
}
