import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'app-contacts-manager',
  templateUrl: './contacts-manager.component.html',
  styleUrls: ['./contacts-manager.component.css']
})
export class ContactsManagerComponent implements OnInit {

  selectedContact:Contact;
  contactsDeleted = false;

  constructor(private contactsService: ContactsService) { }

  onAdd() {
    this.selectedContact = new Contact({});
  }

  onRemoveAll() {
    this.contactsService.removeAll().subscribe((deleteComplete) => {
      this.selectedContact = null;
    });
  }

  ngOnInit() {
  }

}
