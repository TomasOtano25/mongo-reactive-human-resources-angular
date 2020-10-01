import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../app-endpoints';
import {Competency} from './competency.model';

@Injectable()
export class CompetencyService {

  constructor(private httpService: HttpService) { }

  public readAll(): Observable<Competency[]> {
    return this.httpService.get(AppEndpoints.COMPETENCIES);
  }
  public readOne(id: string): Observable<Competency> {
    return this.httpService.get(AppEndpoints.COMPETENCIES + '/' + id);
  }
  public create(competency: Competency): Observable<Competency> {
    return this.httpService.post(AppEndpoints.COMPETENCIES, competency);
  }
  public delete(competency: Competency): Observable<void> {
    return this.httpService.delete(AppEndpoints.COMPETENCIES + '/' + competency.id);
  }
  public update(id: string, competency: Competency): Observable<Competency> {
    return this.httpService.put(AppEndpoints.COMPETENCIES + '/' + id, competency);
  }
}
