import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Job, Risk} from '../../shared/job.model';
import {JobService} from '../../shared/job.service';

@Component({
  selector: 'app-job-create-dialog',
  templateUrl: './job-create-dialog.component.html',
  styleUrls: ['./job-create-dialog.component.css']
})
export class JobCreateDialogComponent implements OnInit {

  public risks;
  public job: Job = {id: null, name: null, risk: null, minSalary: null, maxSalary: null};
  public  submitted: boolean;


  constructor(private dialog: MatDialog, private jobService: JobService,
              private message: MatSnackBar) {
    this.risks = this.enumSelector(Risk);
  }

  ngOnInit(): void {
    this.submitted = false;
  }

  enumSelector(definition): {value: any, title: string}[] {
    return Object.keys(definition)
      .map(key => ({ value: definition[key], title: key }));
  }

  public create(): void {

    this.jobService.create(this.job).subscribe(() => {
      this.dialog.closeAll();
    }, (error: any) => {
      console.log(error);
      this.message.open('Ups, algo salió mal.', null, {duration: 2000});
    }, () => {
      this.message.open('Puesto creado con éxito.', null, {duration: 3000});
    });
  }

}
