import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';
import { VerPacienteComponent } from './components/ver-paciente/ver-paciente.component';

import { SharedModule } from './shared/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AgregarEditarPacienteComponent } from './components/agregar-editar-paciente/agregar-editar-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoPacientesComponent,
    VerPacienteComponent,
    AgregarEditarPacienteComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
