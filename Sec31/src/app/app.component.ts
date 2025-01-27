import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders=['male','female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: "",
    //   gender: 'male',
    // });
    this.signupForm.form.patchValue({
      userData: {
        userName: suggestedName,
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log('submitted', form)
  // }
  onSubmit() {
    console.log('submitted', this.signupForm)
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.userData.defaultQuestion;
    this.user.answer = this.signupForm.value.userData.questonAnswer;
    this.user.gender = this.signupForm.value.userData.gender;

    this.signupForm.reset();
  }
}
