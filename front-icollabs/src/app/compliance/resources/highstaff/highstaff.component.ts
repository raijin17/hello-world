import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/services/event.service";
import {ToastrManager} from "ng6-toastr-notifications";
import {GlobalService} from "../../../core/globals/global.service";
import {EventMessage} from "../../../core/models/EventMessage";
import {EventBlocked} from "../../../core/models/EventBlocked";
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface Altapersonal {
  orden: number; // Este es unnúmero consecutivo que pertenece al orden en el que aparece en la tabla
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
  ver: string;
  editar: string;
  pdf: string;
  eliminar: string;
}

export class AltapersonalImp implements Altapersonal {
  orden: number; // Este es unnúmero consecutivo que pertenece al orden en el que aparece en la tabla
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
  ver: string;
  editar: string;
  pdf: string;
  eliminar: string;

  constructor(orden: number, empleadoId: number, numEmpleado: string, nombre: string,
              apPaterno: string, apMaterno: string, genero: string,
              posicion: string, departamento: string, puesto: string,
              lugarDeTrabajo: string, ver: string, editar: string, pdf: string, eliminar: string) {

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
    this.ver = ver;
    this.editar = editar;
    this.pdf = pdf;
    this.eliminar = eliminar;
  }
}

@Component({
  selector: 'app-highstaff',
  templateUrl: './highstaff.component.html',
  styleUrls: ['./highstaff.component.scss']
})
export class HighstaffComponent implements OnInit {
    elementData: Array<Altapersonal>;
    titulo: string = 'Alta de personal';
    inTitulo: string = 'Confirmacion';
    registros = new MatTableDataSource<Altapersonal>();
    columnas: string[] = ['orden', 'numEmpleado', 'nombre', 'apPaterno', 'apMaterno', 'genero', 'posicion', 'departamento', 'puesto', 'lugarDeTrabajo', 'ver', 'editar', 'eliminar'];
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

  constructor(private eventService: EventService,
              private toastr: ToastrManager,
              private globalService: GlobalService) { }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.cargarTabla();
  }

  cargarTabla(){
    this.addBlock(1,null);
    this.elementData = [];
    for(let i = 0; i < 5; i++ ){
      let index: number = 1;
      const empleadoId = 2;
      let empleadoStrId = "4";
      let nombres = "Alberto";
      let paterno = "Garcia";
      let materno = "Loreto";

      let generoId = "2";
      let posicionId = "2";
      let departamentoId = "3";
      let puestoId = "4";
      let lugarTrabajoId = "4";

      this.elementData.push(new AltapersonalImp(index, empleadoId, empleadoStrId, nombres, paterno, materno,
          generoId, posicionId, departamentoId, puestoId, lugarTrabajoId, 'home-compliance/',
          'home-compliance/',
          'home-compliance/',
          'home-compliance/'));
      index++;
    }

    this.registros = new MatTableDataSource<Altapersonal>(this.elementData);
    this.registros.paginator = this.paginator;
    this.registros.sort = this.sort;

    this.addBlock(2,null);
  }

  action(idEmpleado, tipo) {
    this.eventService.sendChangePage(new
    EventMessage(11, {
      idEmpleado: idEmpleado,
      tipo: tipo
    },'Compliance.Alta Personal'));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

}
