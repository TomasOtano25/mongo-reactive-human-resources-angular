import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Level } from '../../shared/candidate.model';
import * as _moment from 'moment';

let moment = _moment;

if ('default' in _moment) {
  moment = _moment['default'];
}

declare var $: any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingComponent implements OnInit{
  @Input() trainingForm: FormGroup;
  @Input() index: number;
  @Output() deleteTraining: EventEmitter<number> = new EventEmitter();

  public levels;
  public submitted: boolean;

  constructor() {

    this.levels = this.enumSelector(Level);
  }

  enumSelector(level): {value:any, title: string}[] {
    return Object.keys(level)
      .map(key => ({ value: level[key], title: key }));
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.deleteTraining.emit(this.index);
  }

}
