import {NgModule} from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  imports: [
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
  ],
  exports: [
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule
  ]
})
export class AppMaterialModule {

}

