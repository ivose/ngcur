
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { hostViewClassName } from '@angular/compiler';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(resData => {
      console.log(resData)
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.isLoading = false;
      this.showErrorAlert(errorMessage);
      this.error = errorMessage;
    }
      // errorResp => {
      //   switch(errorResp.error.error.message) {
      //     case 'EMAIL_EXISTS':
      //       this.error = 'This email exists already';
      //   }
      //   this.error = 'An Error occurred';
      //   this.isLoading = false;
      // }
    )
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // const alertCom = new AlertComponent();
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=> {
      this.closeSub.unsubscribe();
      viewContainerRef.clear();
    });

  }

  ngONDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
      // https://angular.io/guide/dynamic-component-loader
    }
  }
}
