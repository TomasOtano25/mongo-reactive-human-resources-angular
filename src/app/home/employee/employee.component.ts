import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CancelYesDialogService } from 'src/app/core/cancel-yes-dialog.service';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService, private cancelYesDialogService: CancelYesDialogService) {
    this.employees = null;

   }

  ngOnInit(): void {
    this.show();
  }

  public show(): void {
    this.employeeService.readAll().subscribe(
      data => {
        this.employees = data;
      });
  }

  public delete(employee: Employee) {
    this.cancelYesDialogService.confirmThis('Estas seguro que deseas eliminar?', ()=> {
      this.employeeService.delete(employee).subscribe(() => this.show())
    },
    () => {});
  }



}
