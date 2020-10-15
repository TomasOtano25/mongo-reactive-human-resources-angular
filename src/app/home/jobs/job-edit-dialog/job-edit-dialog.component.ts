import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from '../../shared/job.model';
import { JobService } from '../../shared/job.service';

@Component({
  selector: 'app-job-edit-dialog',
  templateUrl: './job-edit-dialog.component.html',
  styleUrls: ['./job-edit-dialog.component.css']
})
export class JobEditDialogComponent implements OnInit {
  public job: Job = {id: null, name: null};
  public job2: Job = {id: null, name: null};
  public submitted: boolean;

  @Input() data: Job;

  constructor(public dialog: NgbActiveModal, private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.readOne(this.data.id).subscribe((job: Job) => {
      this.job = job;
    });
    this.job2.id = this.data.id;
    this.job2.name = this.data.name;

    this.submitted = false;
  }

  public update(): void {
    this.jobService.update(this.job.id, this.job2).subscribe(() => {
      this.dialog.close();
    }, (error: any) => {
      // this.message.open('Ups, algo salió mal.', null, {duration: 2000});
    }, () => {
      // this.message.open('Lenguaje actualizado correctamente.', null, {duration: 3000});
    });
  }

}
