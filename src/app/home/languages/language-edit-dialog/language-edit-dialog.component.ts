import {Component, Inject, OnInit} from '@angular/core';
import {Language} from '../../shared/language.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {LanguageService} from '../../shared/language.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: './language-edit-dialog.component.html',
  styleUrls: ['./language-edit-dialog.component.css']
})
export class LanguageEditDialogComponent implements OnInit {

  public language: Language = {id: null, name: null};
  public language2: Language = {id: null, name: null};
  public submitted: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
              private languageService: LanguageService, private message: MatSnackBar) {
    this.languageService.readOne(data.obj.id).subscribe((language: Language) => {
      this.language = language;
    });
  }

  ngOnInit(): void {
    this.language2.id = this.data.obj.id;
    this.language2.name = this.data.obj.name;

    this.submitted = false;
  }

  public update(): void {
    this.languageService.update(this.language.id, this.language2).subscribe(() => {
      this.dialog.closeAll();
    }, (error: any) => {
      this.message.open('Ups, algo salió mal.', null, {duration: 2000});
    }, () => {
      this.message.open('Lenguaje actualizado correctamente.', null, {duration: 3000});
    });
  }

}
