import { Injectable             } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { HttpParams             } from "@angular/common/http";
import { Observable             } from "rxjs";
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/core/globals/global.service';

const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type': 'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
  })
};

@Injectable({
  providedIn: 'root'
})

export class ComplianceHighstaffService {
  private baseUrl = environment.microexamenUrl;
  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  getEmployee() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.baseUrl}exam/empleados`, {params : this.parameters });
  }
}
