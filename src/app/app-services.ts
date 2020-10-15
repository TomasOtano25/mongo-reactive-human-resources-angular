import {LanguageService} from './home/shared/language.service';
import {JobService} from './home/shared/job.service';
import {CompetencyService} from './home/shared/competency.service';
import {CandidateFormService} from './home/shared/candidate-form.service';
import {CandidateService} from './home/shared/candidate.service';
import {EmployeeService} from './home/shared/employee.service';
import {ExportService} from './utils/export.service';
import { DatePipe } from '@angular/common';

export class AppServices {
  public static SERVICES = [
      LanguageService,
      JobService,
      CompetencyService,
      CandidateService,
      EmployeeService,
      CandidateFormService,
      ExportService,
      DatePipe
    ];
}
