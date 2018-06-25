import {NgModule} from '@angular/core';
import {ContactsComponent} from "../contacts/contacts.component";
import {ContactsListComponent} from "../contacts/contacts-list/contacts-list.component";
import {ContactsResolver} from "../contacts/resolvers/contacts-resolver";
import {RouterModule} from "@angular/router";
import {ContactDetailsComponent} from "../contacts/contact-details/contact-details.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ContactsComponent,
        children: [{
          path: '',
          component: ContactsListComponent,
          resolve: {
            contacts: ContactsResolver
          }
        },
          {
            path: ':id',
            component: ContactDetailsComponent,
            outlet: 'details'
          }]
      }])
  ],
  declarations: []
})
export class ContactsRoutingModule { }
