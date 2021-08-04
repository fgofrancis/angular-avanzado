import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//auth routing

//pages routing

// import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { HeaderComponent } from './shared/header/header.component';

import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    AppComponent,
    // BreadcrumbsComponent,
    // SidebarComponent,
    // HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ComponentsModule
  ],
   providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
