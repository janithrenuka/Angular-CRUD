import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {

  constructor(
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<DeletePopupComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  deleteEmployee() {
    console.log(this.data);
    this._empService.deleteEmployee(this.data.id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee Deleted.', 'done')
        this._dialogRef.close(true);
      },
      error: console.log
    })
  }

}
