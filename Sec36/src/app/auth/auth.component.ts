
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      this.authService.login(email, password).subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
      });
    } else {
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData)
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
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
    );
    }
    console.log(form.value);
    form.reset();
  }
}
