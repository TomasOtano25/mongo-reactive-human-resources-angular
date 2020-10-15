import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from './http.service';
import {Role} from './role.model';
import {Token} from './token.model';

@Injectable({ providedIn: 'root'})
export class TokensService {
  static END_POINT = '/users/token';
  static REGISTER_END_POINT = '/users';
  static REGSITER_PASSWORD = '/password';

  constructor(private httpService: HttpService) { }

  login(mobile: number, password: string): Observable<any> {
    return this.httpService.login(mobile, password, TokensService.END_POINT);
  }

  register(mobile: number, username: string, email: string): Observable<any> {
    const body = {
      mobile: mobile,
      username: username,
      email: email
    };
    return this.httpService.post(TokensService.REGISTER_END_POINT, body);
  }

  changePassword(mobile: number, password: string) {
    const body = {
      mobile: mobile,
      newPassword: password,
    };
    return this.httpService.put(TokensService.REGISTER_END_POINT+TokensService.REGSITER_PASSWORD+'/'+mobile, body);
  }

  logout(): void {
    return this.httpService.logout();
  }

  isAdmin(): boolean {
    return this.httpService.getToken ? this.httpService.getToken.roles.includes(Role.ADMIN) : false;
  }

  public get getToken(): Token {
    return this.httpService.getToken;
  }

  getMobile(): number {
    return this.httpService.getToken ? this.httpService.getToken.mobile : undefined;
  }

  getName(): string {
    return this.httpService.getToken ? this.httpService.getToken.name : '???';
  }
}
