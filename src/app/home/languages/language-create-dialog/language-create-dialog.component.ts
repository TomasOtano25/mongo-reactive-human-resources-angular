import { Component, OnInit } from '@angular/core';
import {Language} from '../../shared/language.model';
import {MatDialog} from '@angular/material/dialog';
import {LanguageService} from '../../shared/language.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: './language-create-dialog.component.html',
  styleUrls: ['./language-create-dialog.component.css']
})
export class LanguageCreateDialogComponent implements OnInit {

  public language: Language = {id: null, name: null};
  public  submitted: boolean;

  constructor(private dialog: MatDialog, private languageService: LanguageService,
              private message: MatSnackBar) { }

  ngOnInit(): void {
    this.submitted = false;
  }

  public create(): void {
    this.languageService.create(this.language).subscribe(() => {
      this.dialog.closeAll();
    }, (error: any) => {
      console.log(error);
      this.message.open('Ups, algo salió mal.', null, {duration: 2000});
    }, () => {
      this.message.open('Lenguaje creado con éxito.', null, {duration: 3000});
    });
  }

}
