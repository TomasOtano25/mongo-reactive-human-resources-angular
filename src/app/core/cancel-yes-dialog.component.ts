import {Component, OnInit} from '@angular/core';
import { CancelYesDialogService } from './cancel-yes-dialog.service';

@Component({
  selector: 'app-cancel-yes-dialog',
  templateUrl: 'cancel-yes-dialog.component.html',
  styleUrls: ['./cancel-yes-dialog.component.css']
})
export class CancelYesDialogComponent implements OnInit {
  message: any;

  constructor(private cancelYesDialogService: CancelYesDialogService) {

  }

  ngOnInit(): any {
    this.cancelYesDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

}
