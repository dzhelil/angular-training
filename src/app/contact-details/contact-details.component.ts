import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Input()
  set contact(_contact: Contact) {
    this.currentContact = _contact;
    if(_contact) {
      this.form.reset({
        firstName: _contact.firstName,
        lastName: _contact.lastName,
        email: _contact.email
      });
    }
    if(this.currentContact && this.currentContact.id !== undefined) {
      this.showEdit = false;
    } else {
      this.showEdit = true;
    }
  };

  @Output()
  contactChange = new EventEmitter<Contact>();

  currentContact:Contact;
  showEdit;
  form:FormGroup;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email])
    });

  }

  onSubmit(form:any) {
    const formContact = form.value;
    if (this.currentContact.id) {
      formContact.id = this.currentContact.id;
      this.contactsService.update(formContact).subscribe((res) => {
        this.contactChange.emit(res);
      }, (error) => console.error(error));
    } else {
      this.contactsService.add(formContact).subscribe((res) => {
        this.contactChange.emit(res);
      });
    }

    this.showEdit = false;
  }

}
