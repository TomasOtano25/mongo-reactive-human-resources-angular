import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../app-endpoints';
import {Candidate} from './candidate.model';

@Injectable()
export class CandidateService {
  static CANDIDATE_CURRENT = '/current';

  constructor(private httpService: HttpService) { }

  public readAll(): Observable<Candidate[]> {
    return this.httpService.get(AppEndpoints.CANDIDATES);
  }

  public readCurrent(): Observable<Candidate> {
    return this.httpService.get(AppEndpoints.CANDIDATES + CandidateService.CANDIDATE_CURRENT);
  }

  public create(candidate: any): Observable<Candidate> {
    return this.httpService.post(AppEndpoints.CANDIDATES, candidate);
  }

  public contract(id: string): Observable<Candidate> {
    return this.httpService.post(AppEndpoints.CANDIDATES + '/' + id);
  }
}
