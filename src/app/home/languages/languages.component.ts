import { Component, OnInit } from '@angular/core';
import {Language} from '../shared/language.model';
import {MatDialog} from '@angular/material/dialog';
import {LanguageService} from '../shared/language.service';
import {LanguageCreateDialogComponent} from './language-create-dialog/language-create-dialog.component';
import {take} from 'rxjs/operators';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {LanguageEditDialogComponent} from './language-edit-dialog/language-edit-dialog.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  public language: Language;
  public title: string;
  public columns: Array<string>;
  public dataSource: Language[];

  constructor(private dialog: MatDialog, private languageService: LanguageService) {
    this.language = {name: null};
    this.dataSource = null;
  }

  ngOnInit(): void {
    this.title = 'Gestion de lenguages';
    this.columns = ['name'];
    this.show();
  }

  public show(): void {
    this.languageService.readAll().subscribe(
      data => {this.dataSource = data; });
  }

  public create(): void {
    this.dialog.open(LanguageCreateDialogComponent)
      .afterClosed().pipe(take(1)).subscribe(
      () => {
        this.show();
      }
    );
  }

  public update(language: Language): void {
    this.dialog.open(LanguageEditDialogComponent,
      {data: {obj: language}}).afterClosed().subscribe(
      () => {
        this.show();
      }
    );
  }

  public delete(language: Language): void {
    this.dialog.open(CancelYesDialogComponent).afterClosed().pipe(take(1)).subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.languageService.delete(language).subscribe(() => this.show());
      }
    }, error => console.log(error), () => {
      // this.dataSource = this.dataSource.filter(o => o.id !== language.id);
    });
  }

}
