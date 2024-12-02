import { CanMatch, CanMatchFn, RedirectCommand, Route, Router, Routes, UrlSegment } from '@angular/router';
import { TaskComponent } from './tasks/task/task.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { canLeaveEditPage, NewTaskComponent } from './tasks/new-task/new-task.component';
import { routes as userRoutes } from './users/user-tasks/users.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject, Injectable } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random() > 0.5;
    if (shouldGetAccess) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
};

@Injectable({ providedIn: 'root' })
class CanMatchTeamSection implements CanMatch {
    constructor(private router: Router) { }
    canMatch(route: Route, segments: UrlSegment[]) {
        const shouldGetAccess = Math.random();
        if (shouldGetAccess < 0.5) {
            return true;
        }
        return new RedirectCommand(this.router.parseUrl('/unauthorized'));
    }
}

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
    },
    {
        path: 'users/:userId', //<your domain>/tasks
        component: UserTasksComponent,
        children: userRoutes,
        //canMatch: [dummyCanMatch], // või CanMatchTeamSection
        data: {
            message: 'hello',
        },
        resolve: {
            userName: resolveUserName,
        },
        title: resolveTitle,
    },
    {
        path: '**',
        component: NotFoundComponent,
        canDeactivate: [canLeaveEditPage],
    },
];