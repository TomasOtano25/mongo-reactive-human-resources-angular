import {NgModule} from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  imports: [
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDividerModule
  ],
  exports: [
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDividerModule
  ]
})
export class AppMaterialModule {

}

