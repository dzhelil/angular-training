import {Contact} from "../contact";
import {Observable} from "rxjs/internal/Observable";

export abstract class AbstractContactService {

  abstract getAll(): Observable<Contact[]>;
  abstract getById(id:number): Observable<Contact>;
  abstract update(contact:Contact): Observable<Contact>;
  abstract remove(id:number): Observable<any>;
  abstract add(contact:Contact);
  abstract removeAll(): Observable<any>;
}
