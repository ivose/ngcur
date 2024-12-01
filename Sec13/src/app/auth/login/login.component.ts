import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}
const savedForm = window.localStorage.getItem('saved-login-form');
const loadedForm = savedForm ? JSON.parse(savedForm) : { email: '' };

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(loadedForm.email, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  get emailErrors() {
    // return (this.form.controls.email.touched
    //   && this.form.controls.email.dirty
    //   && this.form.controls.email.invalid)
    const control = this.form.controls.email;
    if (control.touched && control.dirty && control.errors) {
      if (control.errors['required']) {
        return 'Email is required';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return null;
  }
  get passwordErrors() {
    const control = this.form.controls.password;
    if (control.touched && control.dirty && control.errors) {
      if (control.errors['required']) {
        return 'Password is required';
      }
      if (control.errors['minlength']) {
        return 'Password must be at least 6 characters long';
      }
    }
    return null;
  }

  ngOnInit(): void {
    // const savedForm = window.localStorage.getItem('saved-login-form');
    // if (savedForm) {
    //   const { email } = JSON.parse(savedForm);
    //   this.form.patchValue({ email });
    // }
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email }));
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);

  }
}