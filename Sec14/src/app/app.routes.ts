import { Routes } from '@angular/router';
import { TaskComponent } from './tasks/task/task.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveUserName, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { routes as userRoutes } from './users/user-tasks/users.routes';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
    },
    {
        path: 'users/:userId', //<your domain>/tasks
        component: UserTasksComponent,
        children: userRoutes,
        data: {
            message: 'hello',
        },
        resolve: {
            userName: resolveUserName,
        },
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];