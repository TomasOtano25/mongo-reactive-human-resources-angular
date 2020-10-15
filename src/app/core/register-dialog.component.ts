import {Component, Inject, Input} from '@angular/core';
import {TokensService} from './tokens.service';
import {Router} from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './register-dialog.component.html',
  styleUrls: ['dialog.component.css']
})
export class RegisterDialogComponent {
  mobile: number;
  password: string;
  username: string;
  email: string;

  homeUrl: string;


  nowTime: Date;
  newMobile: string;

  @Input() data: any;

  constructor(public activeModal: NgbActiveModal,  private tokensService: TokensService,
              private router: Router) {

  }

  register(): void {
    this.tokensService.register(this.mobile, this.username, this.email).subscribe(() => {
      this.tokensService.changePassword(this.mobile, this.password).subscribe(() => {
          this.activeModal.close('Close click');
      })
    });

        // this.tokensService.changePassword(this.mobile, this.password).subscribe(() => {
        //   this.activeModal.close('Close click');
        //   // this.router.navigate([this.data.homeUrl]);
        // })
  }

}
