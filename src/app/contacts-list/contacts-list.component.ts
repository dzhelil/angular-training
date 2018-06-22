import {Component, OnInit, Output, EventEmitter, Input,} from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  @Input()
  set contact(_contact: Contact){
    if (_contact && _contact.id) {
      this.getContacts();
      this.selectedContact = _contact;
    } else if (_contact == null) {
      this.getContacts();
    }
  }

  @Input()
  set contactsDeleted(_param) {

  }

  @Output()
  contactChange= new EventEmitter<Contact>();

  highlightColor = "lightgray";
  public contacts: Observable<Contact[]>;
  public selectedContact: Contact;

  constructor(private contactsService: ContactsService) {

    // contactsService.getAll().subscribe((contacts) => {
    //   this.contacts = contacts;
    // }, (error) => {
    //   console.error(error);
    // });
  }

  ngOnInit() {
    this.getContacts();
  }

  onSelect(contact: Contact) {
    this.contactChange.emit(contact);
  }

  remove(contact: Contact) {
    this.contactsService.remove(contact.id).subscribe((res) => {
      this.contactChange.emit(null);
      this.getContacts();
    });

  }

  getContacts() {
    this.contacts = this.contactsService.getAll();
  }
}
