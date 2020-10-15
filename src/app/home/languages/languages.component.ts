import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Language} from '../shared/language.model';
import {LanguageService} from '../shared/language.service';
import {LanguageCreateDialogComponent} from './language-create-dialog/language-create-dialog.component';
import {LanguageEditDialogComponent} from './language-edit-dialog/language-edit-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelYesDialogService } from 'src/app/core/cancel-yes-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';

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

  public languages$: Observable<Language[]>;
  public filteredLanguages$: Observable<Language[]>;

  public formGroup: FormGroup;

  constructor(private dialog: NgbModal, private languageService: LanguageService,
    private cancelYesDialogService: CancelYesDialogService, private message: ToastrService,
    private formBuilder: FormBuilder) {

    this.language = {name: null};
    this.dataSource = null;

    this.formGroup = formBuilder.group({ filter: [''] });

    this.languages$ = this.getLanguage();

    this.filteredLanguages$ = this.formGroup.get('filter').valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.languages$),
      map(([val, languages]) =>
        !val ? languages : languages.filter((x) => x.name.toLowerCase().includes(val.toLowerCase()))
      )
    );

  }

  ngOnInit(): void {
    this.title = '';
    this.columns = ['name'];
    this.show();
  }

  public show(): void {
    this.languageService.readAll().subscribe(
      data => {this.dataSource = data; });
  }

  private getLanguage(): Observable<Language[]> {
    return this.languageService.readAll().pipe(tap(console.log));
  }

  public create(): void {
    this.dialog.open(LanguageCreateDialogComponent)
      .result.then((result) => {
        this.show();
      });
  }

  public update(language: Language): void {
    const modalRef = this.dialog.open(LanguageEditDialogComponent);
    modalRef.componentInstance.data = language;
    modalRef.result.then(() => {
      this.show();
    });
    /*this.dialog.open(LanguageEditDialogComponent,
      {data: {obj: language}}).afterClosed().subscribe(
      () => {
        this.show();
      }
    );*/
  }

  public delete(language: Language): void {
    this.cancelYesDialogService.confirmThis('Estas seguro que deseas eliminar?', () => {
      this.languageService.delete(language).subscribe(() => {
        this.message.success('El lenguage ha sido eliminiado con exito', null);
        this.show()
      });
    }, () => {});
    /*this.dialog.open(CancelYesDialogComponent).afterClosed().pipe(take(1)).subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.languageService.delete(language).subscribe(() => this.show());
      }
    }, error => console.log(error), () => {
      // this.dataSource = this.dataSource.filter(o => o.id !== language.id);
    });*/
  }

}
