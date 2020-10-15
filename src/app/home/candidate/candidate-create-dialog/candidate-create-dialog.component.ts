import {Component, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../../shared/candidate.model';
import {Job} from '../../shared/job.model';
import {JobService} from '../../shared/job.service';
import {FormArray, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CandidateFormService} from '../../shared/candidate-form.service';
import { Language } from '../../shared/language.model';
import { Competency } from '../../shared/competency.model';
import { CompetencyService } from '../../shared/competency.service';
import { LanguageService } from '../../shared/language.service';
import { CandidateService } from '../../shared/candidate.service';

@Component({
  selector: 'app-candidate-create-dialog',
  templateUrl: './candidate-create-dialog.component.html',
  styleUrls: ['./candidate-create-dialog.component.css']
})
export class CandidateCreateDialogComponent implements OnInit, OnDestroy {
  candidateForm: FormGroup;
  candidateFormSub: Subscription;
  formInvalid = false;
  trainings: FormArray;
  workExperiences: FormArray;
  contacts: FormArray;

  jobs: Job[];
  languages: Language[];
  competencies: Competency[];

  submitted = false;

  constructor(private candidateFormService: CandidateFormService, private  jobService: JobService,
    private competencyService: CompetencyService, private languageService: LanguageService,
    private candidateService: CandidateService) {
    this.show();
    this.loadData();
  }

  ngOnInit(): void {
    this.candidateFormSub = this.candidateFormService.candidateForm$
      .subscribe(candidate => {
        this.candidateForm = candidate;
        this.trainings = this.candidateForm.get('trainings') as FormArray;
        this.workExperiences = this.candidateForm.get('workExperiences') as FormArray;
        this.contacts = this.candidateForm.get('contacts') as FormArray;
      });
  }

  get candidateFormControl() {
    return this.candidateForm.controls;
  }

  ngOnDestroy(): void {
    this.candidateFormSub.unsubscribe();
  }

  addTraining(): void {
    this.candidateFormService.addTraining();
  }

  deleteTraining(index: number): void {
    this.candidateFormService.deleteTrainings(index);
  }

  addWorkExperience(): void {
    this.candidateFormService.addWorkExperience();
  }

  deleteWorkExperience(index: number): void {
    this.candidateFormService.deleteWorkExperience(index);
  }

  addContact(): void {
    this.candidateFormService.addContact();
  }

  deleteContact(index: number): void {
    this.candidateFormService.deleteContact(index);
  }

  saveCandidate(): void {
    this.submitted = true;
    // moment(new Date()).format('YYYY-MM-DD[T00:00:00.000]');
    let candidates = this.candidateForm.get('trainings') as FormArray
    let workExperiences = this.candidateForm.get('workExperiences') as FormArray;
    for(let control of candidates.controls) {
      control.value.to = this.toApiDate(control.value.to);
      control.value.from = this.toApiDate(control.value.from);
    }
    for(let control of workExperiences.controls) {
      control.value.to = this.toApiDate(control.value.to);
      control.value.from = this.toApiDate(control.value.from);
    }
    this.candidateService.create(this.candidateForm.value).subscribe(() => {
      console.log("Candidato Almacenado");
    });

    console.log(this.candidateForm.value);

    this.candidateForm.reset();

  }

  toApiDate(bDate) {
    const apiDate: string = new Date(bDate).toISOString();
    return apiDate;
  }

  public show(): void {
    this.jobService.readAll().subscribe(
      data => {this.jobs = data; });
    this.competencyService.readAll().subscribe(
      data => {this.competencies = data; });
    this.languageService.readAll().subscribe(
      data => {this.languages = data; });
  }

  public loadData() {
    this.candidateService.readCurrent().subscribe(
      data => {
        if(data !== null) {
          this.candidateFormService.candidateForm$.subscribe(candidate => {
            this.candidateForm = candidate;
            this.candidateForm.controls['name'].setValue(data.name)
            this.candidateForm.controls['dni'].setValue(data.dni)
            this.candidateForm.controls['salary'].setValue(data.salary)
            const index = this.jobs.findIndex(job => job.id === data.job.id);
            this.candidateForm.controls['job'].setValue(this.jobs[index]);

            // this.candidateForm.controls['trainings'].setValue(data.trainings);
            // for(let training of data.trainings) {
            // }
            // name: data.name,
            // dni: data.dni,
            // salary: data.salary,
          });
          for(let training of data.trainings) {
            console.log(training);
            this.candidateFormService.addTraining(training);
          }
          for(let workExperience of data.workExperiences) {
            this.candidateFormService.addWorkExperience(workExperience);
          }
          for(let contact of data.contacts) {
            this.candidateFormService.addContact(contact);
          }
        }
      }
    );
  }

  changeJob(event: any): void {

  }
}
