import {Component, Inject, Input, OnInit} from '@angular/core';
import {CompetencyService} from '../../shared/competency.service';
import {Competency} from '../../shared/competency.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-competency-edit-dialog',
  templateUrl: './competency-edit-dialog.component.html',
  styleUrls: ['./competency-edit-dialog.component.css']
})
export class CompetencyEditDialogComponent implements OnInit {
  public competency: Competency = {id: null, description: null};
  public competency2: Competency = {id: null, description: null};
  public submitted: boolean;

  @Input() data :Competency;

  constructor(public dialog: NgbActiveModal,
              private competencyService: CompetencyService) {



  }

  ngOnInit(): void {
    this.competencyService.readOne(this.data.id).subscribe((competency: Competency) => {
      this.competency = competency;
    });

    this.competency2.id = this.data.id;
    this.competency2.description = this.data.description;
    this.submitted = false;
  }

  public update(): void {
    this.competencyService.update(this.competency.id, this.competency2).subscribe(() => {
      this.dialog.close();
    }, (error: any) => {

    }, () => {

    });
  }

}
