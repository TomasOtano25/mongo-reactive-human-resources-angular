import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CandidateForm} from './candidate-form.model';
import {Candidate, Contact, Training, WorkExperience} from './candidate.model';
import {TrainingForm} from './training-form.model';
import { WorkExperienceForm } from './work-experience-form.model';
import { ContactForm } from './contact-form.model';

@Injectable()
export class CandidateFormService {
  public candidate: Candidate = { name: null, dni: null, salary: null, job: null };
  public training: Training = { description: null, level: null, from: null, to: null, institution: null };
  public workExperience: WorkExperience = { company: null, job: null, from: null, to: null, salary: null };
  public contact: Contact = { name: null, phone: null };

  private candidateForm: BehaviorSubject<
    FormGroup | undefined
    > = new BehaviorSubject(this.fb.group(
      new CandidateForm(this.candidate)
  ));
  candidateForm$: Observable<FormGroup> = this.candidateForm.asObservable();

  constructor(private fb: FormBuilder) {}

  addTraining(training?: Training): void {
    const currentCandidate = this.candidateForm.getValue();
    const currentTrainings = currentCandidate.get('trainings') as FormArray;

    let data: TrainingForm = new TrainingForm(this.training);
    if(training) {
      data = new TrainingForm(training);
    }
    currentTrainings.push(
      this.fb.group(
        data
      )
    );

    this.candidateForm.next(currentCandidate);
  }

  addWorkExperience(workExperience?: WorkExperience): void {
    const currentCandidate = this.candidateForm.getValue();
    const currentWorkExperiences = currentCandidate.get('workExperiences') as FormArray;

    let data: WorkExperienceForm = new WorkExperienceForm(this.workExperience);
    if(workExperience) {
      data = new WorkExperienceForm(workExperience)
    }
    currentWorkExperiences.push(
      this.fb.group(
        data
      )
    );

    this.candidateForm.next(currentCandidate);
  }

  addContact(contact?: Contact): void {
    const currentCandidate = this.candidateForm.getValue();
    const currentContacts = currentCandidate.get('contacts') as FormArray;

    let data: ContactForm = new ContactForm(this.contact);
    if(contact) {
      data = new ContactForm(contact);
    }
    currentContacts.push(
      this.fb.group(
        data
      )
    );

    this.candidateForm.next(currentCandidate);
  }

  deleteTrainings(i: number): void {
    const currentCandidate = this.candidateForm.getValue();
    const currentTrainings = currentCandidate.get('trainings') as FormArray;

    currentTrainings.removeAt(i);

    this.candidateForm.next(currentCandidate);
  }

  deleteWorkExperience(i: number): void {
    const currentCandidate = this.candidateForm.getValue();
    const currentWorkExperiences = currentCandidate.get('workExperiences') as FormArray;

    currentWorkExperiences.removeAt(i);

    this.candidateForm.next(currentCandidate);
  }

  deleteContact(i: number): void {
    const currentCandidate = this.candidateForm.getValue();
    const currentContacts = currentCandidate.get('contacts') as FormArray;

    currentContacts.removeAt(i);

    this.candidateForm.next(currentCandidate);
  }

}
