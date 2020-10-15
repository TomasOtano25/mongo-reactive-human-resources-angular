import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../app-endpoints';
import {Employee} from './employee.model';

@Injectable()
export class EmployeeService {

  constructor(private httpService: HttpService) { }

  public readAll(): Observable<Employee[]> {
    return this.httpService.get(AppEndpoints.EMPLOYEES);
  }

  public delete(employee: Employee): Observable<void> {
    return this.httpService.delete(AppEndpoints.EMPLOYEES + '/' + employee.id)
  }

  public search(fromDate: Date, toDate: Date): Observable<Array<Employee>> {
    this.httpService.param('fromDate', fromDate.toISOString().substring(0,10));
    this.httpService.param('toDate', toDate.toISOString().substring(0,10));
    return this.httpService.get(AppEndpoints.EMPLOYEES+'/search');
  }
}
