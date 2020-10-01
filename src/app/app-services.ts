import {LanguageService} from './home/shared/language.service';
import {JobService} from './home/shared/job.service';
import {CompetencyService} from './home/shared/competency.service';

export class AppServices {
  public static SERVICES = [
      LanguageService,
      JobService,
      CompetencyService
    ];
}
