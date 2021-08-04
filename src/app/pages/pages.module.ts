import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



//Modulos
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [
    PagesComponent,
    ProgressComponent,
    Grafica1Component,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    
   ],
   exports: [
   
   ]
})
export class PagesModule { }
