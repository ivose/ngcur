import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function passwordsEqueal(control: AbstractControl) {
  const password = control.get('password')?.value;
  const cpassword = control.get('confirmPassword')?.value;
  return password === cpassword ? null : { passwordsNotEqual: true };
}
function equalValues(controlName1:string, controlName2:string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;
    return val1 === val2 ? null : { valuesNotEqual: true };
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
    }, {
      validators: [ equalValues('password', 'confirmPassword')/* või passwordsEqueal */]
    }),
    firstname: new FormControl('', {
      validators: [Validators.required]
    }),
    lastname: new FormControl('', {
      validators: [Validators.required]
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required]
      }),
      number: new FormControl('', {
        validators: [Validators.required]
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required]
      }),
      city: new FormControl('', {
        validators: [Validators.required]
      }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required]
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {
      validators: [Validators.required]
    }),
  });


  onSubmit() {
    if(!this.form.invalid) {
      console.log("INVALID");
      return;
    }
    console.log("SUBMIT")
    console.log(this.form)
  }

  onReset() {
    this.form.reset();
  }
}
