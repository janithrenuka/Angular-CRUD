import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = [
    'id', 
    'firstName',
    'lastName', 
    'email', 
    'company', 
    'education', 
    'dateOfBirth', 
    'gender', 
    'experiance', 
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmp() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe ({
      next: (val: any) => {
        if(val) {
          this.getEmployeeList();
        }
      },
    })
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.employees);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })

    // this._empService.getEmployeeList().subscribe(
    //   data => {
    //     if(data) {
    //       console.log(data);
    //       this.dataSource = new MatTableDataSource(data.employeeList);
    //       this.dataSource.sort = this.sort
    //       this.dataSource.paginator = this.paginator;
    //     }
    //     else {
    //       error: console.log
    //     }
    //   }
    // )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  openDeletePopup(data: any) {
    const dialogRef = this._dialog.open(DeletePopupComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe ({
      next: (val: any) => {
        if(val) {
          this.getEmployeeList();
        }
      },
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });
    
    dialogRef.afterClosed().subscribe ({
      next: (val: any) => {
        if(val) {
          this.getEmployeeList();
        }
      },
    })
  }

}
