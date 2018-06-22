import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactsService } from './contacts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './highlight.directive';
import {AbstractContactService} from "./contact-service";
import { NamePipe } from './name.pipe';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactDetailsComponent,
    HighlightDirective,
    NamePipe
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/contacts',
        pathMatch: 'full'
      },
      {
        path: 'contacts',
        component: ContactsListComponent
      },
      {
        path: 'contacts/:id',
        component: ContactDetailsComponent
      }]),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: AbstractContactService, useClass: ContactsService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
