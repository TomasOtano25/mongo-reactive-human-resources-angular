import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Candidate} from '../../shared/candidate.model';
import {FormArray, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CandidateFormService} from '../../shared/candidate-form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  @Input() contactForm: FormGroup;
  @Input() index: number;
  @Output() deleteContact: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  delete(): void {
    this.deleteContact.emit(this.index);
  }
}
