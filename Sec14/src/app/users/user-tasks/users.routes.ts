import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../../tasks/tasks.component';
import { NewTaskComponent } from '../../tasks/new-task/new-task.component';
import { NoTaskComponent } from '../../tasks/no-task/no-task.component';


export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No Task Selected',
    },
    {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        //runGuardsAndResolvers: 'always',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
            userTasks: resolveUserTasks,
        },
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
    },
];