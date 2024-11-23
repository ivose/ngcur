import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { LoggingService } from './app/logging.service';
import { InjectionToken } from '@angular/core';

export const TasksServiceToken  = new InjectionToken<TasksService>('tasks-service-token');

bootstrapApplication(AppComponent, {
    //providers: [TasksService]//provideri kasutamisel ei pea kasutama Services dekoraatorit @Injectable
    providers: [{provide: TasksServiceToken, useClass: TasksService}]
}).catch((err) => console.error(err));
// bootstrapApplication(AppComponent).catch((err) => console.error(err));
// bootstrapApplication(AppComponent, {
//     providers: [LoggingService]
// }).catch((err) => console.error(err));
