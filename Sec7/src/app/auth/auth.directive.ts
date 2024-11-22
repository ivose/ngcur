import { Permission } from './auth.model';
// ng g d auth/auth --skip-tests
import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() { 
    effect(() => {
      if(this.authService.activePermission() === this.userType()) {
        console.log('Show element');
        this.viewContainerRef.createEmbeddedView(this.templateRef);//htmli ng-template appAuth="admin" jaoks.
      } else {
        console.log('do not show element');
        this.viewContainerRef.clear();
      }
    })
  }

}
