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
export class UserTasksComponent {
  //userId = input.required<string>();
  message = input.required<string>();//app.routes kohal data: {message: '..'}
  userName = input.required<string>();

  /*private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  userName: string = '';

  // userName = computed(()=> this.usersService.users.find(u => u.id = this.userId())?.name);

  ngOnInit(): void {
    // console.log(this.activatedRoute);
    // console.log(this.activatedRoute.snapshot);
    // console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
    console.log('Input data', this.message());
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.usersService.users.find(u => u.id === paramMap.get('userId'))?.name || '';
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }*/

}

export const resolveUserName: ResolveFn<string> = (ar: ActivatedRouteSnapshot, rs: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(u => u.id === ar.paramMap.get('userId'))?.name || '';
  return userName;
}
