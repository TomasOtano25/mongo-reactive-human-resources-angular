import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TokensService} from './tokens.service';
import {Router} from '@angular/router';

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

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private tokensService: TokensService,
              private router: Router) {
    this.homeUrl = data.homeUrl;
  }

  login(): void {
    this.tokensService.login(this.mobile, this.password).subscribe(
      () => {
        this.router.navigate([this.homeUrl]);
      }
    );
  }
}
