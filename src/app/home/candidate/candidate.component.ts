import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Candidate } from '../shared/candidate.model';
import { CandidateService } from '../shared/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  candidates: Candidate[];

  constructor(private candidateService: CandidateService, private router: Router) {
    this.candidates = null;
    this.show();
   }

  ngOnInit(): void {

  }

  public show(): void {
    this.candidateService.readAll().subscribe(
      data => { this.candidates = data; });
  }

  public contract(id: string): void {
    this.candidateService.contract(id).subscribe(() => this.show());
  }

}
