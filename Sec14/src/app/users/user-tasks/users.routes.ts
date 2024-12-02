import { Routes } from "@angular/router";
import { TaskComponent } from "../../tasks/task/task.component";
import { NewTaskComponent } from "../../tasks/new-task/new-task.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',//<domain>/users/<uid>/tasks
        component: TaskComponent,
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
    },
];