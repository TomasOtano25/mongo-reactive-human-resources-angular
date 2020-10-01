import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

import {LoginDialogComponent} from './login-dialog.component';
import {HttpService} from './http.service';
import {TokensService} from './tokens.service';
import {CrudComponent} from './crud.component';
import {CancelYesDialogComponent} from './cancel-yes-dialog.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule
  ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    LoginDialogComponent
  ],
  exports: [
    CancelYesDialogComponent,
    CrudComponent,
    LoginDialogComponent
  ],
  entryComponents: [
    CancelYesDialogComponent,
    LoginDialogComponent
  ],
  providers: [
    HttpService,
    TokensService
  ]
})
export class CoreModule {

}
