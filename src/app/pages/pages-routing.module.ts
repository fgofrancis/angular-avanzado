import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
   path: '', 
   component: PagesComponent,
   canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {titulo:'Dashboard'}},
      { path: 'account-setting' , component: AccountSettingComponent, data: {titulo:'Account-Setting'}},
      { path: 'buscar/:termino' , component: BusquedaComponent, data: {titulo:'Busquedas'}},
      { path: 'grafica1' , component: Grafica1Component, data: {titulo:'Gráfica #1'}},
      { path: 'perfil' , component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },
      { path: 'progress' , component: ProgressComponent, data: {titulo:'Progreso'}},
      { path: 'promesas' , component: PromesasComponent, data:{ titulo:'Promesas'}},
      { path: 'rxjs' , component: RxjsComponent, data: { titulo: 'RxJs'} },

      //Mantenimientos
      { path: 'hospitales' , component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales '} },
      { path: 'medicos' , component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos '} },
      { path: 'medicos/:id' , component: MedicoComponent, data: { titulo: 'Mantenimiento de Médicos detalle '} },
     
     //Rutas de ADMIN_ROLE
      { path: 'usuarios' ,canActivate:[AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'} },
      
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
