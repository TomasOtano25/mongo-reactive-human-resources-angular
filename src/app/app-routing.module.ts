import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './welcome.component';
import {LanguagesComponent} from './home/languages/languages.component';
import {JobsComponent} from './home/jobs/jobs.component';
import {CompetenciesComponent} from './home/competencies/competencies.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'welcome'},
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'languages', component: LanguagesComponent},
      {path: 'jobs', component: JobsComponent},
      {path: 'competencies', component: CompetenciesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
