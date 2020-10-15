import {FormControl, Validators} from '@angular/forms';
import {Training} from './candidate.model';

export class TrainingForm {
  description = new FormControl();
  level = new FormControl();
  from = new FormControl();
  to = new FormControl();
  institution = new FormControl();

  constructor(training: Training) {
    this.description.setValue(training.description);
    this.description.setValidators([Validators.required]);

    this.level.setValue(training.level);

    if(training.from !== null) {
      this.from.setValue(this.convertDate(training.from));
    }
    if(training.to !== null) {
      this.to.setValue(this.convertDate(training.to));
    }

    this.institution.setValue(training.institution);
  }

  convertDate(dateP: string) {
    const date = new Date(dateP);
    return date.toISOString().substring(0,10);
  }
}
