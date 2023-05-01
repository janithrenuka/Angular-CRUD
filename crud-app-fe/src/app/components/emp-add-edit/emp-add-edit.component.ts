import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { Employee } from 'src/app/models/EmployeeVM';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: String[] = [
    'Matric',
    'Diploma',
    'Intermidate',
    'Bachelor',
    'Masters',
    'Phd'
  ]

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group ({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      education: '',
      company: '',
      experiance: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.empForm.valid) {
      if(this.data) {
        this.empForm.value.id = this.data.id;
        this.empForm.value.dateOfBirth = formatDate(this.empForm.value.dateOfBirth,'yyyy-MM-dd', 'en-US');
        console.log(this.empForm.value.dateOfBirth);
        this._empService.updateEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee Updated.')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } 
      else {

        const emp: Employee = {
          id: 0,
          firstName: this.empForm.value.firstName,
          lastName: this.empForm.value.lastName,
          email: this.empForm.value.email,
          dateOfBirth: this.empForm.value.dateOfBirth,
          education: this.empForm.value.education,
          gender: this.empForm.value.gender,
          company: this.empForm.value.company,
          experiance: this.empForm.value.experiance,
          package: this.empForm.value.package
        }

        this._empService.addEmployee(emp).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added succesfully.')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }
}
