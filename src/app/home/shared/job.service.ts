import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../app-endpoints';
import {Injectable} from '@angular/core';
import {Job} from './job.model';

@Injectable()
export class JobService {

  constructor(private httpService: HttpService) { }

  public readAll(): Observable<Job[]> {
    return this.httpService.get(AppEndpoints.JOBS);
  }
  public readOne(id: string): Observable<Job> {
    return this.httpService.get(AppEndpoints.JOBS + '/' + id);
  }
  public create(job: Job): Observable<Job> {
    return this.httpService.post(AppEndpoints.JOBS, job);
  }
  public delete(job: Job): Observable<void> {
    return this.httpService.delete(AppEndpoints.JOBS + '/' + job.id);
  }
  public update(id: string, job: Job): Observable<Job> {
    return this.httpService.put(AppEndpoints.JOBS + '/' + id, job);
  }
}
