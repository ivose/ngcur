import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNameControl.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });

    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });

    // You can also subscribe to status changes
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
    this.signupForm.patchValue({
      userData: {
        username: 'ivose',
        email: 'ivose@ivose.ee',
      },
      //gender: 'male',
      //hobbies: [],
    });
  }

  onSubmit(): void {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNameControl(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<{ [s: string]: boolean } | null> | Observable<{ [s: string]: boolean } | null> {
    const promise = new Promise<{ [s: string]: boolean } | null>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
