import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeListResponse } from '../models/EmployeeListResponse';
import { Employee } from '../models/EmployeeVM';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private _http: HttpClient, 
  ) { }

  readonly baseUrl = 'https://localhost:7099/api/Employee';

  addEmployee(data: Employee): Observable<any> {
    return this._http.post(`${this.baseUrl}/AddNewEmployee`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(`${this.baseUrl}/GetEmployeeListDetails`);
  }

  deleteEmployee(id: number) : Observable<any> {
    return this._http.delete(`${this.baseUrl}/DeleteEmployee/${id}`);
  }

  updateEmployee(data: Employee) : Observable<any> {
    return this._http.put(`${this.baseUrl}/UpdateEmployee`,data);
  }
}
