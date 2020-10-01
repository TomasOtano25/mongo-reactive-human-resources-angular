
import { Injectable } from '@angular/core';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';
import {Observable} from 'rxjs';
import {Language} from './language.model';

@Injectable()
export class LanguageService {

  constructor(private httpService: HttpService) { }

  public readAll(): Observable<Language[]> {
    return this.httpService.get(AppEndpoints.LANGUAGES);
  }
  public readOne(id: string): Observable<Language> {
    return this.httpService.get(AppEndpoints.LANGUAGES + '/' + id);
  }
  public create(language: Language): Observable<Language> {
    return this.httpService.post(AppEndpoints.LANGUAGES, language);
  }
  public delete(language: Language): Observable<void> {
    return this.httpService.delete(AppEndpoints.LANGUAGES + '/' + language.id);
  }
  public update(id: string, language: Language): Observable<Language> {
    return this.httpService.put(AppEndpoints.LANGUAGES + '/' + id, language);
  }
}
