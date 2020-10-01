import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {CompetencyService} from '../../shared/competency.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Competency} from '../../shared/competency.model';

@Component({
  selector: 'app-competency-edit-dialog',
  templateUrl: './competency-edit-dialog.component.html',
  styleUrls: ['./competency-edit-dialog.component.css']
})
export class CompetencyEditDialogComponent implements OnInit {
  public competency: Competency = {id: null, description: null};
  public competency2: Competency = {id: null, description: null};
  public submitted: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
              private competencyService: CompetencyService, private message: MatSnackBar) {
    this.competencyService.readOne(data.obj.id).subscribe((competency: Competency) => {
      this.competency = competency;
    });
  }

  ngOnInit(): void {
    this.competency2.id = this.data.obj.id;
    this.competency2.description = this.data.obj.description;
    this.submitted = false;
  }

  public update(): void {
    this.competencyService.update(this.competency.id, this.competency2).subscribe(() => {
      this.dialog.closeAll();
    }, (error: any) => {
      this.message.open('Ups, algo salió mal.', null, {duration: 2000});
    }, () => {
      this.message.open('Competencia actualizada correctamente.', null, {duration: 3000});
    });
  }

}
