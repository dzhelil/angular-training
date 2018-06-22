import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";


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

  constructor(private contactsService: ContactsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email])
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] && params['id'] !== '-1') {
        this.contactsService.getById(params['id']).subscribe((contact: Contact) => {
          this.currentContact = contact;
          this.form.reset({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            id: contact.id
          });
        });
      } else if (params['id'] && params['id'] === '-1') {
        const contact = new Contact({});
        this.currentContact = contact;
        this.showEdit = true;
        this.form.reset({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          id: contact.id
        });
      }
    })
  }

  onSubmit(form:any) {
    const formContact = form.value;
    if (this.currentContact.id) {
      formContact.id = this.currentContact.id;
      this.contactsService.update(formContact).subscribe(() => {
        this.router.navigate(['contacts'])
      });
    } else {
      console.log("Add called!")
      this.contactsService.add(formContact).subscribe(() => {
        this.router.navigate(['contacts'])
      });
    }

    this.showEdit = false;
  }

  onCancel(event: MouseEvent) {
    event.preventDefault();
    this.showEdit = false;
  }

}
