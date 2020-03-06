import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CatalogoMaestroService} from '../../../../core/services/catalogo-maestro.service';
import {PerfilComboService} from '../../../../core/services/perfil-combo.service';
import {EventService} from '../../../../core/services/event.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {GlobalService} from '../../../../core/globals/global.service';
import {EventMessage} from '../../../../core/models/EventMessage';
import {EventBlocked} from '../../../../core/models/EventBlocked';
import {ComplianceHighstaffService} from '../../../../core/services/compliance-highstaff.service';
import {PersonalCompetenteService} from 'src/app/compliance/services/personal-competente.service';

export interface RegisterPersonal {
  orden: number;
  empleadoId: number;
  numEmpleado: string;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  genero: string;
  posicion: string;
  departamento: string;
  puesto: string;
  lugarDeTrabajo: string;
  usuarioModifico: string;
  fechaHoraUltimaModificacion: string;
  estatus:string;
  ver: string;
  editar: string;
 // pdf: string;
  eliminar: string;
  mensajeEliminar: string;
}

export class RegisterPersonalImp implements RegisterPersonal {
  orden: number;
  empleadoId: number;
  numEmpleado: string;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  genero: string;
  posicion: string;
  departamento: string;
  puesto: string;
  lugarDeTrabajo: string;
  usuarioModifico: string;
  fechaHoraUltimaModificacion: string;
  estatus:string;
  ver: string;
  editar: string;
  //pdf: string;
  eliminar: string;
  mensajeEliminar: string;
  constructor(orden: number, empleadoId: number, numEmpleado: string, nombre: string,
              apPaterno: string, apMaterno: string, genero: string,
              posicion: string, departamento: string, puesto: string,
              lugarDeTrabajo: string, usuarioModifico: string, fechaHoraUltimaModificacion: string,
              estatus:string, ver: string, editar: string,/// pdf: string,
              eliminar: string, mensajeEliminar: string
  ) {
    this.orden = orden;
    this.empleadoId = empleadoId;
    this.numEmpleado = numEmpleado;
    this.nombre = nombre;
    this.apPaterno = apPaterno;
    this.apMaterno = apMaterno;
    this.genero = genero;
    this.posicion = posicion;
    this.departamento = departamento;
    this.puesto = puesto;
    this.lugarDeTrabajo = lugarDeTrabajo;
    this.usuarioModifico = usuarioModifico;
    this.fechaHoraUltimaModificacion = fechaHoraUltimaModificacion;
    this.estatus = estatus;
    this.ver = ver;
    this.editar = editar;
   // this.pdf = pdf;
    this.eliminar = eliminar;
    this.mensajeEliminar = mensajeEliminar;
  }
}

@Component({
  selector: 'app-high',
  templateUrl: './high.component.html',
  styleUrls: ['./high.component.scss']
})
export class HighComponent implements OnInit {
  elementData: Array<RegisterPersonal>;
  titulo: string = 'Personal Interno';
  inTitulo: string = 'Confirmacion';
  registros = new MatTableDataSource<RegisterPersonal>();
  columnas: string[] = ['orden', 'numEmpleado', 'nombre', 'apPaterno', 'apMaterno', 'genero', 'posicion', 'departamento', 'puesto', 'lugarDeTrabajo','Usuario Modifico','Fecha_y_Hora_de_Ultima_Modificación','Estatus', 'ver', 'editar',  'eliminar'];
  filters = [
    { label: "Nombre", inputtype: "text" },
    { label: "Apellido paterno", inputtype: "text" },
    { label: "Apellido Materno", inputtype: "text" },
    { label: "Género", inputtype: "select", options: [] },
    { label: "Posición", inputtype: "select", options: [] },
    { label: "Departamento", inputtype: "select", options: [] },
    { label: "Puesto", inputtype: "select", options: [] },
    { label: "Lugar de trabajo", inputtype: "select", options: [] },
  ];
  filtrobtn = { label: "buscar" };
  registros_x_pagina = [5, 10, 20, 30];

  constructor(private personal: PersonalCompetenteService,
              private catalogoMaestroService: CatalogoMaestroService,
              private preguntas: PerfilComboService,
              private eventService: EventService,
              public toastr: ToastrManager,
              public globalService: GlobalService) { }


  getCatalog(index, catalog) {
    this.catalogoMaestroService.getCatalogoIndividual(catalog).subscribe(
        (dataBack) => {
          console.log("dataBack");
          console.log(dataBack);
        });
  }

  loadCatalogs() {
    this.getCatalog(3, 'gender');
    this.getCatalog(4, 'position');
    this.getCatalog(5, 'department');
    this.getCatalog(6, 'workstation');
    this.getCatalog(7, 'employeePlace');
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getDataSource();
  }

  getDataSource() {
    debugger;
    this.addBlock(1, null);
    this.elementData = [];
    this.personal.getEmpleados().subscribe(
        dataBack => {
          let estatus = dataBack['status'];
          if( estatus === 'exito' ){
            let index: number = 1;
            Object.keys(dataBack['empleados']).forEach(key => {
              const empleadoId = dataBack['empleados'][key].empleadoId;
              let empleadoStrId = dataBack['empleados'][key].empleadoStrId;
              let nombres = dataBack['empleados'][key].nombres;
              let paterno = dataBack['empleados'][key].paterno;
              let materno = dataBack['empleados'][key].materno;
              let generoId = dataBack['empleados'][key].generoId;
              let entidadEstatus = dataBack['empleados'][key].estidadEstatus;
              let posicionId = dataBack['empleados'][key].posicionId;
              let departamentoId = dataBack['empleados'][key].departamentoId;
              let puestoId = dataBack['empleados'][key].puestoId;
              let lugarTrabajoId = dataBack['empleados'][key].lugarTrabajoId;
              let userCreated = dataBack['empleados'][key].userCreated;
              let dateCreated = dataBack['empleados'][key].dateCreated;
              let userUpdated = dataBack['empleados'][key].userUpdated;
              let dateUpdated = dataBack['empleados'][key].dateUpdated;
              this.elementData.push(new RegisterPersonalImp(index, empleadoId, empleadoStrId, nombres, paterno, materno, generoId, posicionId, departamentoId, puestoId, lugarTrabajoId, userUpdated, dateUpdated, estatus, 'home-compliance/',
                  'home-compliance/',
                  'home-compliance',
                  'Esta seguro de eliminar el empleado numero: ' + empleadoStrId));
              index++;
            });

            console.log( this.elementData)
            this.registros = new MatTableDataSource<RegisterPersonal>(this.elementData);
            this.registros.paginator = this.paginator;
            this.registros.sort = this.sort;

            this.addBlock(2, null);
          }
        });
  }

  valorModal: number;
  eliminar($event, empleadoId: number) {
    this.valorModal = $event;
    /*si modal regresa 1 es que aceptado la operacion */
    if (this.valorModal == 1) {
      this.personal.deleteEliminar(empleadoId).subscribe(
          respuesta => {
            if (respuesta['status'] == "exito") {
              this.eventService.sendChangePage(new EventMessage(10, {},'Compliance.Personal Competente'));
            }
          }
      );
    }
  }

  action(idEmpleado, tipo) {
    this.eventService.sendChangePage(new
    EventMessage(11, {
      idEmpleado: idEmpleado,
      tipo: tipo
    },'Compliance.registerPersonal.11'));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }
}
