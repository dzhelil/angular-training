import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forRoot([{ path: 'contacts', loadChildren: 'src/app/contacts/contacts.module#ContactsModule' },
      { path: 'about', loadChildren: 'src/app/about/about.module#AboutModule' }])
  ],
  declarations: [],
  exports: []
})
export class AppRoutingModule { }
