import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {LoginDialogComponent} from './core/login-dialog.component';
import {Router} from '@angular/router';
import {TokensService} from './core/tokens.service';

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
})
export class WelcomeComponent {

  constructor(private dialog: MatDialog, private router: Router,
              private tokensService: TokensService) {
    if (this.tokensService.getToken) {
      this.router.navigate(['/home']);
    }
  }


  login(): void {
    this.dialog.open(LoginDialogComponent,
      {
        data: {homeUrl: 'home'}
      }
    );
  }
}
