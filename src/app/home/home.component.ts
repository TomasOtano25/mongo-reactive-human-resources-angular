import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TokensService} from '../core/tokens.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  username: string;
  mobile: string;

  // loginTime: Date;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router, private tokensService: TokensService,
              private breakpointObserver: BreakpointObserver) {
    this.username = tokensService.getName();
    this.mobile = tokensService.getMobile().toString();
  }

  isAdmin(): boolean {
    return this.tokensService.isAdmin();
  }

  logout(): void {
    // this.loginTime = this.tokensService.logout();
    this.tokensService.logout();
  }
}
