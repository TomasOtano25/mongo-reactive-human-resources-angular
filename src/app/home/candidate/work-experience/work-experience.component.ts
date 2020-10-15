import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html'
})
export class WorkExperienceComponent implements OnInit{
  @Input() workExperienceForm: FormGroup;
  @Input() index: number;
  @Output() deleteWorkExperience: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.deleteWorkExperience.emit(this.index);
  }

}
