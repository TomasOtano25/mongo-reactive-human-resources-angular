import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs/operators';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {Competency} from '../shared/competency.model';
import {MatDialog} from '@angular/material/dialog';
import {CompetencyService} from '../shared/competency.service';
import {CompetencyCreateDialogComponent} from './competency-create-dialog/competency-create-dialog.component';
import {CompetencyEditDialogComponent} from './competency-edit-dialog/competency-edit-dialog.component';

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

  constructor(private dialog: MatDialog, private competencyService: CompetencyService) { }

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
      .afterClosed().pipe(take(1)).subscribe(
      () => {
        this.show();
      }
    );
  }

  public update(competency: Competency): void {
    this.dialog.open(CompetencyEditDialogComponent,
      {data: {obj: competency}}).afterClosed().subscribe(
      () => {
        this.show();
      }
    );
  }

  public delete(competency: Competency): void {
    this.dialog.open(CancelYesDialogComponent).afterClosed().pipe(take(1)).subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.competencyService.delete(competency).subscribe(() => this.show());
      }
    }, error => console.log(error), () => {
      // this.dataSource = this.dataSource.filter(o => o.id !== language.id);
    });
  }

}
