import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject, EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Error} from './error.model';
import {Token} from './token.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
  static API_END_POINT = environment.API;
  static UNAUTHORIZED = 401;
  static CONNECTION_REFUSE = 0;
  static NOT_FOUND = 404;

  private token: Token;
  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;
  private successfulNotification = undefined;

  private loginTime: Date;
  private logoutTime: Date;

  private tokenSubject: BehaviorSubject<Token>;
  public tokenObservable: Observable<Token>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.resetOptions();
    this.tokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('token')));
    this.tokenObservable = this.tokenSubject.asObservable();
  }

  login(mobile: number, password: string, endPoint: string): Observable<any> {
    return this.authBasic(mobile, password).post(endPoint).pipe(
      map(token => {
        this.token = token;
        this.token.mobile = new JwtHelperService().decodeToken(token.token).user;
        this.token.name = new JwtHelperService().decodeToken(token.token).name;
        this.token.roles = new JwtHelperService().decodeToken(token.token).roles;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.tokenSubject.next(token);
        this.loginTime = new Date();
      }), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  logout(): void {
    this.token = undefined;
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['']);
    /*const nowTime = new Date();
    if (this.loginTime.getDate() === nowTime.getDate()) {
      return null;
    } else {
      return this.loginTime;
    }*/
  }

  public get getToken(): Token {
    return this.tokenSubject.value;
  }

  param(key: string, value: string): HttpService {
    this.params = this.params.append(key, value);
    return this;
  }

  post(endPoint: string, body?: object): Observable<any> {
    return this.http.post(HttpService.API_END_POINT + endPoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  put(endpoint: string, body?: object): Observable<any> {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  private authBasic(mobile: number, password: string): HttpService {
    return this.header('Authorization', 'Basic ' + btoa(mobile + ':' + password))
  }

  private header(key: string, value: string): HttpService {
    this.headers = this.headers.append(key, value);
    return this;
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    if (this.token !== undefined) {
      this.header('Authorization', 'Bearer ' + this.token.token);
    } else if(localStorage.getItem('token')) {
      let user: Token = JSON.parse(localStorage.getItem('token'));
      this.header('Authorization', 'Bearer' + user.token);
    }
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private extractData(response): any {
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/pdf') !== -1) {
        const blob = new Blob([response.body], {type: 'application/pdf'});
        window.open(window.URL.createObjectURL(blob));
      } else if (contentType.indexOf('application/json') !== -1) {
        return response.body;
      }
    } else {
      return response;
    }
  }

  private handleError(response): any {
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.snackBar.open('Unauthorized', 'Error', {duration: 5000});
      this.logout();
      this.router.navigate(['']);
      return EMPTY;
    } else if (response.status === HttpService.CONNECTION_REFUSE) {
      this.snackBar.open('Connection Refuse', 'Error', {duration: 5000});
      return EMPTY;
    } else if (response.status === HttpService.NOT_FOUND) {
      error = {error: 'Not Found', message: '', path: ''};
      this.snackBar.open(error.error + ': ' + error.message, 'Info', {duration: 2000});
      return throwError(error);
    }
  }
}
