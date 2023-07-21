import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-agregar-editar-paciente',
  templateUrl: './agregar-editar-paciente.component.html',
  styleUrls: ['./agregar-editar-paciente.component.css']
})
export class AgregarEditarPacienteComponent implements OnInit{
  loading: boolean = false;
  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
              private _pacienteService: PacienteService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private aRoute: ActivatedRoute)
  {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      ciudadRecidencia: ['', Validators.required],
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0) {
      this.operacion = 'Editar';
      this.obtenerPaciente(this.id)
    }
  }

  obtenerPaciente(id: number){
    this.loading = true;
    this._pacienteService.getPaciente(id).subscribe(data => {
      this.form.setValue({
        nombres: data.nombres,
        apellidos: data.apellidos,
        tipoDocumento: data.tipoDocumento,
        numeroDocumento: data.numeroDocumento,
        fechaNacimiento: data.fechaNacimiento,
        ciudadRecidencia: data.ciudadRecidencia
      })
      this.loading = false;
    })
  }

  agregarEditarPaciente(){

    const paciente: Paciente = {
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      tipoDocumento: this.form.value.tipoDocumento,
      numeroDocumento: this.form.value.numeroDocumento,
      fechaNacimiento: this.form.value.fechaNacimiento,
      ciudadRecidencia: this.form.value.ciudadRecidencia
    }

    if(this.id != 0){
      paciente.id = this.id;
      this.editarPaciente(this.id, paciente);
    } else{
      this.agregarPaciente(paciente);
    }
  }

  editarPaciente(id: number, paciente: Paciente){
    this.loading = true;
    this._pacienteService.updatePaciente(id, paciente).subscribe(() => {
      this.loading = false;
      this.mensajeExito('Paciente actualizado');
      this.router.navigate(['/listaPacientes']);
    })
  }

  agregarPaciente(paciente: Paciente){
    this._pacienteService.addPaciente(paciente).subscribe(data => {
      this.mensajeExito('registrado');
      this.router.navigate(['/listaPacientes']);
    })
  }


  mensajeExito(texto: string) {
    this._snackBar.open(`El paciente fue ${texto} con exito`,'', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

}
