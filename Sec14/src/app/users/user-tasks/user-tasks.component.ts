import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  message = input.required<string>();
  userName = input.required<string>();
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit():void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log(data);
      }
    });
  }
}

export const resolveUserName: ResolveFn<string> = (ar: ActivatedRouteSnapshot, rs: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(u => u.id === ar.paramMap.get('userId'))?.name || '';
  return userName;
}

export const resolveTitle: ResolveFn<string> = (ar: ActivatedRouteSnapshot, rs: RouterStateSnapshot) => {
  return resolveUserName(ar, rs) + '\'s tasks';
}