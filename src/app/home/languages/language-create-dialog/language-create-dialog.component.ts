import { Component, OnInit } from '@angular/core';
import {Language} from '../../shared/language.model';
import {LanguageService} from '../../shared/language.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './language-create-dialog.component.html',
  styleUrls: ['./language-create-dialog.component.css']
})
export class LanguageCreateDialogComponent implements OnInit {

  public language: Language = {id: null, name: null};
  public  submitted: boolean;

  constructor(public dialog: NgbActiveModal, private languageService: LanguageService,
              private message: ToastrService) { }

  ngOnInit(): void {
    this.submitted = false;
  }

  public create(): void {
    this.languageService.create(this.language).subscribe(() => {
      this.dialog.close();
    }, (error: any) => {
      console.log(error);
      this.message.error('Ups, algo salió mal.', null);
    }, () => {
      this.message.success('Lenguaje creado con éxito.', null);
    });
  }

}
