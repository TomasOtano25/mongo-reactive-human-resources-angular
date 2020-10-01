import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './welcome.component';
import {LanguagesComponent} from './home/languages/languages.component';
import {LanguageReadDialogComponent} from './home/languages/language-read-dialog/language-read-dialog.component';
import {LanguageCreateDialogComponent} from './home/languages/language-create-dialog/language-create-dialog.component';
import {LanguageEditDialogComponent} from './home/languages/language-edit-dialog/language-edit-dialog.component';
import {JobsComponent} from './home/jobs/jobs.component';
import {SidebarComponent} from './home/layouts/sidebar/sidebar.component';
import {JobCreateDialogComponent} from './home/jobs/job-create-dialog/job-create-dialog.component';
import {JobEditDialogComponent} from './home/jobs/job-edit-dialog/job-edit-dialog.component';
import {CompetenciesComponent} from './home/competencies/competencies.component';
import {CompetencyCreateDialogComponent} from './home/competencies/competency-create-dialog/competency-create-dialog.component';
import {CompetencyEditDialogComponent} from './home/competencies/competency-edit-dialog/competency-edit-dialog.component';


export class AppComponents {
  static COMPONENTS = [
    HomeComponent,
    WelcomeComponent,
    LanguagesComponent,
    JobsComponent,
    SidebarComponent,
    CompetenciesComponent,
  ];

  static DIALOGS = [
    LanguageCreateDialogComponent,
    LanguageEditDialogComponent,
    LanguageReadDialogComponent,
    JobCreateDialogComponent,
    JobEditDialogComponent,
    CompetencyCreateDialogComponent,
    CompetencyEditDialogComponent,
  ];
}
