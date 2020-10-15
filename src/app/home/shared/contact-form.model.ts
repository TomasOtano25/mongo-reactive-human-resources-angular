import {FormControl, Validators} from '@angular/forms';
import {Contact} from './candidate.model';

export class ContactForm {
  name = new FormControl();
  phone = new FormControl();

  constructor(contact: Contact) {
    this.name.setValue(contact.name);
    this.name.setValidators([Validators.required]);

    this.phone.setValue(contact.phone);
  }
}
