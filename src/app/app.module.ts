import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import {AppMaterialModule} from './app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponents} from './app-components';
import {AppServices} from './app-services';
import {CdkTableModule} from '@angular/cdk/table';
import { LayoutModule } from '@angular/cdk/layout';

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './navbar/navbar.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { DlDateTimeDateModule, DlDateTimeInputModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    CdkTableModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    NgbModule,
    SidebarModule,
    NavbarModule,
    NgSelectModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    DlDateTimeInputModule
  ],
  declarations: [
    AppComponent,
    AppComponents.COMPONENTS,
    AppComponents.DIALOGS,
  ],
  entryComponents: [
    AppComponents.DIALOGS,
  ],
  providers: [
    AppServices.SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
