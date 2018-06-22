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
import { AboutComponent } from './about/about.component';
import {ContactsResolver} from "./contacts-resolver";
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactDetailsComponent,
    HighlightDirective,
    NamePipe,
    AboutComponent,
    ContactsComponent
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/contacts',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent,
        children: [{
          path: '',
          component: ContactsListComponent,
          resolve: {
              contacts: ContactsResolver
            },
          }, {
          path: '',
          component: ContactDetailsComponent,
          outlet: 'details'
        }]
      },
      {
        path: 'contacts/:id',
        component: ContactsComponent,
        children: [{
          path: '',
          component: ContactsListComponent,
          resolve: {
            contacts: ContactsResolver
          },
        }, {
          path: '',
          component: ContactDetailsComponent,
          outlet: 'details'
        }]
      }], {useHash: true}),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: AbstractContactService, useClass: ContactsService},
    ContactsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
