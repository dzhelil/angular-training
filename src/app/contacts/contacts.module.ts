import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NamePipe} from "./name-pipe/name.pipe";
import {HighlightDirective} from "./highlight-directive/highlight.directive";
import {ContactsComponent} from "./contacts.component";
import {ContactDetailsComponent} from "./contact-details/contact-details.component";
import {ContactsListComponent} from "./contacts-list/contacts-list.component";
import {ContactsResolver} from "./resolvers/contacts-resolver";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContactsRoutingModule} from "../contacts-routing/contacts-routing.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsRoutingModule
  ],
  declarations: [
    ContactsListComponent,
    ContactDetailsComponent,
    HighlightDirective,
    NamePipe,
    ContactsComponent
  ],
  providers: [
    ContactsResolver,

  ]
})
export class ContactsModule { }
