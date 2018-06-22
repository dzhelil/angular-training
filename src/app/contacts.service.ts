import { Injectable } from '@angular/core';
import { Contact } from './contact';
import {AbstractContactService} from "./contact-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactsService extends AbstractContactService {

  private userHeader = new HttpHeaders({identity: 'dzhelil'});

  constructor(private http: HttpClient) {
    super();
    // this.http.get(`${environment.apiUrl}/contacts/init`, {headers: this.userHeader})
    //   .subscribe();
  }

  private CONTACTS: Contact[];

  getAll(): Observable<Contact[]> {
    return this.http.get(`${environment.apiUrl}/contacts`, {headers: this.userHeader}).pipe(
      map((contacts) => contacts.map((contact) => new Contact(contact)))
    );
  }

  getById(id:number): Contact {
     return null;
  }

  update(contact: Contact): Observable<Contact> {
      return this.http.put<Contact>(environment.apiUrl + "/contacts/" + contact.id,
        contact,
        {headers: this.userHeader});
  }

  remove(id:number): Observable<any> {
    return this.http.delete(environment.apiUrl + "/contacts/" + id,
      {headers: this.userHeader});
  }

  add(contact:Contact) {
    return this.http.post<Contact>(environment.apiUrl + "/contacts",
      contact,
      {headers: this.userHeader});
  }

  removeAll(): Observable<any> {
    return this.http.delete(environment.apiUrl + "/contacts/",
      {headers: this.userHeader});
  }

  private findIndexById(contactId: number) {
    let contact = this.getById(contactId);
    if (!contact) return -1;

    return this.CONTACTS.indexOf(contact);
  }
}
