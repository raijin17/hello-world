import { Component, OnInit } from '@angular/core';
import {MdbTableService} from 'angular-bootstrap-md';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  titulo = 'Competensia de los recursos/Alta de Personal';
  constructor(private tableService: MdbTableService) { }

  ngOnInit() {
  }

}
