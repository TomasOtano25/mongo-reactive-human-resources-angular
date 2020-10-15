import {FormArray, FormControl, Validators} from '@angular/forms';
import {Candidate} from './candidate.model';


export class CandidateForm {
  name = new FormControl();
  dni =  new FormControl('', [
    Validators.required
  ]);
  salary = new FormControl();
  job = new FormControl();
  languages = new FormControl();
  competencies = new FormControl();
  trainings = new FormArray([]);
  workExperiences = new FormArray([]);
  contacts = new FormArray([]);

  constructor(candidate: Candidate) {
    if (candidate.name) {
      this.name.setValue(candidate.name);
    }
    this.dni.setValue(candidate.dni);

    this.salary.setValue(candidate.salary);
    this.job.setValue(candidate.job);
    this.languages.setValue(candidate.languages);
    if (candidate.trainings) {
      this.trainings.setValue(candidate.trainings);
    }
    if(candidate.workExperiences) {
      this.workExperiences.setValue(candidate.workExperiences);
    }
    if(candidate.contacts) {
      this.contacts.setValue(candidate.contacts);
    }
  }
}
