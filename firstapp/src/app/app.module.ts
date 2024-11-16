import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  //AppComponendis peab olema standalone: false
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule, FormsModule, SharedModule, TasksModule],
})
export class AppModule {}
