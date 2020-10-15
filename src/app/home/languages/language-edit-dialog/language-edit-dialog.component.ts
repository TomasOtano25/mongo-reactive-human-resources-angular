import {Component, Input, OnInit} from '@angular/core';
import {Language} from '../../shared/language.model';
import {LanguageService} from '../../shared/language.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './language-edit-dialog.component.html',
  styleUrls: ['./language-edit-dialog.component.css']
})
export class LanguageEditDialogComponent implements OnInit {

  public language: Language = {id: null, name: null};
  public language2: Language = {id: null, name: null};
  public submitted: boolean;

  @Input() data: Language;

  constructor(public dialog: NgbActiveModal,
              private languageService: LanguageService, private message: ToastrService) {
    // this.languageService.readOne(this.data.id).subscribe((language: Language) => {
    //   this.language = language;
    // });
  }

  ngOnInit(): void {
    this.language2.id = this.data.id;
    this.language2.name = this.data.name;

    this.submitted = false;
  }

  public update(): void {
    this.languageService.update(this.language2.id, this.language2).subscribe(() => {
      this.dialog.close();
    }, (error: any) => {
      this.message.error('Ups, algo salió mal.', null);
    }, () => {
      this.message.success('Lenguaje actualizado con éxito.', null);
    });
  }

}
