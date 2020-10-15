import {Component} from '@angular/core';

import {LoginDialogComponent} from './core/login-dialog.component';
import {Router} from '@angular/router';
import {TokensService} from './core/tokens.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterDialogComponent } from './core/register-dialog.component';

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
})
export class WelcomeComponent {

  constructor(private dialog: NgbModal, private router: Router,
              private tokensService: TokensService) {
    if (this.tokensService.getToken) {
      this.router.navigate(['/home']);
    }
  }


  login(): void {
    const modalRef = this.dialog.open(LoginDialogComponent);
    modalRef.componentInstance.data = { homeUrl:'home' } ;
  }

  register(): void {
    const modalRef = this.dialog.open(RegisterDialogComponent);
  }
}
