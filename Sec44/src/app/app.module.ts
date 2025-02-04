import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
https://angular.io/docs/ts/latest/guide/testing.html
https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine
https://github.com/angular/angular-cli/wiki/test
https://github.com/angular/angular-cli/wiki/e2e
*/
