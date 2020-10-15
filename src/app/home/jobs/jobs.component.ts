import { Component, OnInit } from '@angular/core';
import {Job} from '../shared/job.model';
import {JobService} from '../shared/job.service';
import {take} from 'rxjs/operators';
import {JobCreateDialogComponent} from './job-create-dialog/job-create-dialog.component';
import { CancelYesDialogService } from '../../core/cancel-yes-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobEditDialogComponent } from './job-edit-dialog/job-edit-dialog.component';

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

  constructor(private dialog: NgbModal, private cancelYesDialogService: CancelYesDialogService,
    private jobService: JobService) {
    this.job = {name: null, risk: null, minSalary: null, maxSalary: null};
    this.dataSource = null;
  }

  ngOnInit(): void {
    this.title = 'Gestion de puestos';
    this.columns = ['name', 'risk', 'minSalary', 'maxSalary'];
    this.show();
  }

  public show(): void {
    this.jobService.readAll().subscribe(
      data => {this.dataSource = data; });
  }

  public create(): void {
    this.dialog.open(JobCreateDialogComponent)
      .result.then((result) => {
        this.show();
      });
  }

  public update(job: Job): void {
    const modalRef = this.dialog.open(JobEditDialogComponent);
    modalRef.componentInstance.data = job;
    modalRef.result.then(() => {
      this.show();
    });
  }

  public delete(job: Job): void {
    this.cancelYesDialogService.confirmThis('Are you sure to delete?', () =>  {
      this.jobService.delete(job).subscribe(() => this.show());
    }, () => {

    });
  }

}
