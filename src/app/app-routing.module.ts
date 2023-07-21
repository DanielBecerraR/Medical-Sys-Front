import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';
import { VerPacienteComponent } from './components/ver-paciente/ver-paciente.component';
import { AgregarEditarPacienteComponent } from './components/agregar-editar-paciente/agregar-editar-paciente.component';

const routes: Routes = [
  { path: '', redirectTo: 'listaPacientes', pathMatch: 'full'},
  { path: 'listaPacientes', component: ListadoPacientesComponent},
  { path: 'agregarPaciente', component: AgregarEditarPacienteComponent},
  { path: 'verPaciente/:id', component: VerPacienteComponent},
  { path: 'editarPaciente/:id', component: AgregarEditarPacienteComponent},
  { path: '**', redirectTo: 'listaPacientes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
