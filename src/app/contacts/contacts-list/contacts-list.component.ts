import {Component, EventEmitter, Input, Output,} from '@angular/core';
import {ContactsService} from '../contacts-service/contacts.service';
import {Contact} from '../contact';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {

  @Input()
  set contact(_contact: Contact){
    if (_contact && _contact.id) {
      this.getContacts$();
      this.selectedContact = _contact;
    } else if (_contact == null) {
      this.getContacts$();
    }
  }

  @Input()
  set contactsDeleted(_param) {

  }

  @Output()
  contactChange= new EventEmitter<Contact>();

  highlightColor = "lightgray";
  public contacts: Contact[];
  public selectedContact: Contact;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.data.subscribe((res) => {
      this.contacts = res.contacts;
    })
  }

  onSelect(contact: Contact) {
    this.router.navigate(['contacts', contact.id]);
  }

  remove(contact: Contact) {
    this.contactsService.remove(contact.id).subscribe(() => {
      this.contactChange.emit(null);
      this.getContacts$();
    });

  }

  getContacts$() {
    this.contactsService.getAll().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }
}
