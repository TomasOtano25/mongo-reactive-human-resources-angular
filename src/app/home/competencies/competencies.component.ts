import { Component, OnInit } from '@angular/core';
import {Competency} from '../shared/competency.model';
import {CompetencyService} from '../shared/competency.service';
import {CompetencyCreateDialogComponent} from './competency-create-dialog/competency-create-dialog.component';
import {CompetencyEditDialogComponent} from './competency-edit-dialog/competency-edit-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CancelYesDialogService } from 'src/app/core/cancel-yes-dialog.service';

@Component({
  selector: 'app-competencies',
  templateUrl: './competencies.component.html',
  styleUrls: ['./competencies.component.css']
})
export class CompetenciesComponent implements OnInit {

  public competency: Competency;
  public title: string;
  public columns: Array<string>;
  public dataSource: Competency[];

  constructor(private dialog: NgbModal, private competencyService: CompetencyService,
    private cancelYesDialogService: CancelYesDialogService) { }

  ngOnInit(): void {
    this.title = 'Gestion de competencias';
    this.columns = ['description'];
    this.show();
  }

  public show(): void {
    this.competencyService.readAll().subscribe(
      data => {this.dataSource = data; });
  }

  public create(): void {
    this.dialog.open(CompetencyCreateDialogComponent)
      .result.then((result) => {
        this.show();
      });
  }

  public update(competency: Competency): void {
    const modalRef = this.dialog.open(CompetencyEditDialogComponent);
    modalRef.componentInstance.data = competency;
    modalRef.result.then(() => {
      this.show();
    });
    // this.dialog.open(CompetencyEditDialogComponent,
    //   {data: {obj: competency}}).afterClosed().subscribe(
    //   () => {
    //     this.show();
    //   }
    // );
  }

  public delete(competency: Competency): void {
    this.cancelYesDialogService.confirmThis('Estas seguro que deseas eliminar?', () =>  {
      this.competencyService.delete(competency).subscribe(() => this.show());
    }, () => {

    });
  }

}
