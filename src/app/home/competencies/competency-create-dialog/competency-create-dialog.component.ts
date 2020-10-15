import { Component, OnInit } from '@angular/core';
import {CompetencyService} from '../../shared/competency.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Competency} from '../../shared/competency.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-competency-create-dialog',
  templateUrl: './competency-create-dialog.component.html',
  styleUrls: ['./competency-create-dialog.component.css']
})
export class CompetencyCreateDialogComponent implements OnInit {

  public competency: Competency = {id: null, description: null};
  public  submitted: boolean;

  constructor(public dialog: NgbActiveModal, private competencyService: CompetencyService,
              private message: MatSnackBar) { }

  ngOnInit(): void {
    this.submitted = false;
  }

  public create(): void {
    this.competencyService.create(this.competency).subscribe(() => {
      this.dialog.close();
    }, (error: any) => {
      console.log(error);
      this.message.open('Ups, algo salió mal.', null, {duration: 2000});
    }, () => {
      this.message.open('Competencia creada con éxito.', null, {duration: 3000});
    });
  }

}
