import {FormControl, Validators} from '@angular/forms';
import {WorkExperience} from './candidate.model';

export class WorkExperienceForm {
  company = new FormControl();
  job = new FormControl();
  from = new FormControl();
  to = new FormControl();
  salary = new FormControl();

  constructor(workExperience: WorkExperience) {
    this.company.setValue(workExperience.company);
    this.company.setValidators([Validators.required]);

    this.job.setValue(workExperience.job);

    this.from.setValue(this.convertDate(workExperience.from));

    this.to.setValue(this.convertDate(workExperience.to));

    this.salary.setValue(workExperience.salary);
  }

  convertDate(dateP: string) {
    const date = new Date(dateP);
    return date.toISOString().substring(0,10);
  }
}
