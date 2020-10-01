import { Component, OnInit } from '@angular/core';
import {Job} from '../shared/job.model';
import {MatDialog} from '@angular/material/dialog';
import {JobService} from '../shared/job.service';
import {take} from 'rxjs/operators';
import {JobCreateDialogComponent} from './job-create-dialog/job-create-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  public job: Job;
  public title: string;
  public columns: Array<string>;
  public dataSource: Job[];

  constructor(private dialog: MatDialog, private jobService: JobService) {
    this.job = {name: null, risk: null, minSalary: null, maxSalary: null};
    this.dataSource = null;
  }

  ngOnInit(): void {
    this.title = 'Getion de puestos';
    this.columns = ['name', 'risk', 'minSalary', 'maxSalary'];
    this.show();
  }

  public show(): void {
    this.jobService.readAll().subscribe(
      data => {this.dataSource = data; });
  }

  public create(): void {
    this.dialog.open(JobCreateDialogComponent)
      .afterClosed().pipe(take(1)).subscribe(
      () => {
        this.show();
      }
    );
  }

  public delete(job: Job): void {
    this.dialog.open(CancelYesDialogComponent).afterClosed().pipe(take(1)).subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.jobService.delete(job).subscribe(() => this.show());
      }
    }, error => console.log(error), () => {
      // this.dataSource = this.dataSource.filter(o => o.id !== language.id);
    });
  }

}
