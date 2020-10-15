import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
import {CancelYesDialogService} from './cancel-yes-dialog.service';
import {RegisterDialogComponent} from './register-dialog.component';



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
    MatTableModule,
    BrowserModule,
    CommonModule
  ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  exports: [
    CancelYesDialogComponent,
    CrudComponent,
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  providers: [
    HttpService,
    TokensService,
    CancelYesDialogService
  ]
})
export class CoreModule {

}
