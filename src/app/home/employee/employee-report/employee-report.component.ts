import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';
import { CancelYesDialogService } from 'src/app/core/cancel-yes-dialog.service';
import { ExportService } from 'src/app/utils/export.service';
import { ExcelJson } from 'src/app/utils/interfaces/excel-json.interface';
import { Employee } from '../../shared/employee.model';
import { EmployeeService } from '../../shared/employee.service';

interface EmployeeSearch {
  fromDate: Date;
  toDate: Date;
}

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  public employeeSearch: EmployeeSearch;

  employees: Employee[];

  @ViewChild('employeeTable') employeeTable: ElementRef;

  constructor(private employeeService: EmployeeService, private cancelYesDialogService: CancelYesDialogService,
    private exportService: ExportService, private message: ToastrService, private datePipe: DatePipe) {
    this.employeeSearch = { fromDate: null, toDate: null };

    this.employees = null;
   }

  ngOnInit(): void {
    this.show();
  }

  public search(): void {
    let isValidDate: boolean = this.validateDates(this.employeeSearch.fromDate, this.employeeSearch.toDate);

    if(isValidDate) {
      const fromDate = this.employeeSearch.fromDate;
      const toDate = this.employeeSearch.toDate;

      this.employeeService.search(new Date(fromDate), new Date(toDate)).pipe(take(1)).subscribe((employees: Array<Employee>) => {
        this.employees = employees;
        this.message.success('Busqueda completada.', null);
      }, error => {
        console.log(error);
      });
    }
  }

  private validateDates(fromDate: Date, toDate: Date): boolean {
    let isValidDate = true;
    if((fromDate == null || toDate == null)) {
      this.message.error('Se requieren la fecha de inicio y la fecha de finalización.', null);
      isValidDate = false;
    }
    let fromDateValid = this.datePipe.transform(fromDate, "dd-MM-yyyy");
    let toDateValid = this.datePipe.transform(toDate, "dd-MM-yyyy");

    if((fromDate != null && toDate !=null) && (toDateValid) < (fromDateValid)) {
      this.message.error('La fecha de finalización debe ser mayor que la fecha de inicio.', null);
      isValidDate = false;
    }
    return isValidDate;
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

  public exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.employeeTable, 'employee_data')
  }

  public exportToExcel(): void {
    const edata: Array<ExcelJson> = [];
    const udt: ExcelJson = {
      data: [
        {A: 'Employee Data'},
        {A: '#', B: 'Name', C: 'Cedula', D: 'Salario', E: 'Puesto'}
      ],
      skipHeader: true
    };
    this.employees.forEach(employee => {
      udt.data.push({
        A: employee.id,
        B: employee.name,
        C: employee.dni,
        D: employee.salary,
        E: employee.job.name
      })
    });
    edata.push(udt);

    this.exportService.exportJsonToExcel(edata, 'employee_data_customized')
  }

  public exportToCsv(): void {
    this.exportService.exportToCsv(this.employees, 'employee-data', ['id', 'name', 'dni', 'salary'])
  }
}
