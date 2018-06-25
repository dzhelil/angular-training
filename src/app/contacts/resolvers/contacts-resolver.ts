import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Contact} from "../contact";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {ContactsService} from "../contacts-service/contacts.service";

@Injectable()
export class ContactsResolver implements Resolve<Contact[]>{

  constructor(private contactService: ContactsService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Contact[]> {

    return this.contactService.getAll();
  }



}
