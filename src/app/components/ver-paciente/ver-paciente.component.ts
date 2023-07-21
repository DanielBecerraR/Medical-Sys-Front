import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css']
})
export class VerPacienteComponent implements OnInit, OnDestroy {

  id!: number;
  paciente!: Paciente;
  loading: boolean = false;
  routeSub!: Subscription;

  constructor(
    private _pacienteService: PacienteService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerPaciente();
  }

  ngOnDestroy(): void {
  }

  obtenerPaciente(){
    this.loading = true;
    this._pacienteService.getPaciente(this.id).subscribe(data => {
      this.paciente = data;
      this.loading = false;
    })
  }
}
