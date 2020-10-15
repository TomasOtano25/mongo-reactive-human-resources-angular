import {Component, Inject, Input} from '@angular/core';
import {TokensService} from './tokens.service';
import {Router} from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './login-dialog.component.html',
  styleUrls: ['dialog.component.css']
})
export class LoginDialogComponent {
  mobile: number;
  password: string;
  homeUrl: string;

  nowTime: Date;
  newMobile: string;

  @Input() data: any;

  constructor(public activeModal: NgbActiveModal,  private tokensService: TokensService,
              private router: Router) {

  }

  login(): void {
    this.tokensService.login(this.mobile, this.password).subscribe(
      () => {
        this.activeModal.close('Close click');
        this.router.navigate([this.data.homeUrl]);
      }
    );
  }
}
