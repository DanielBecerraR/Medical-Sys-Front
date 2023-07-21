import { Subscription } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['nombres', 
                                'apellidos',
                                'tipoDocumento',
                                'numeroDocumento', 
                                'fechaNacimiento',
                                'ciudadRecidencia',
                                'acciones']
  dataSource = new MatTableDataSource<Paciente>();
  loading: boolean  = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, 
              private _pacienteService:PacienteService) { }

  ngOnInit(): void {
    this.ObtenerPacientes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'items por pagina:'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ObtenerPacientes(){
    this.loading = true;
    this._pacienteService.getPacientes().subscribe(data => {
      this.loading = false;
      debugger;
      this.dataSource.data = data;
      console.log(data);
      
    })
  }

  eliminarPaciente(id: number){
    this.loading = true;

    this._pacienteService.deletePaciente(id).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
     this.ObtenerPacientes();
    });
    
  }

  mensajeExito() {
    this._snackBar.open('El paciente se elimino con exito','', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

    // listPacientes: Paciente[] =  [{ 
    // nombres: 'Daniel', 
    // apellidos: 'Becerra', 
    // tipoDocumento: 'Cedula', 
    // numeroDocumento: '123',
    // fechaNacimiento: '2023-07-19',
    // ciudadRecidencia: 'Bogota'}]
  

  
  
}
