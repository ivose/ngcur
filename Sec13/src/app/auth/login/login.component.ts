import { debounceTime, subscribeOn } from 'rxjs';
import { afterNextRender, Component, viewChild, DestroyRef, inject } from '@angular/core';
import { EmailValidator, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        console.log({savedForm});
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }
      const subscription = this.form().valueChanges?.pipe(debounceTime(1000)).subscribe({
        next: (value) => {
          console.log(value);
          window.localStorage.setItem(
            'saved-login-form', 
            JSON.stringify({
              email: value.email,
              password: value.password
            }));
        },
      });
      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }


  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;
    console.log(enteredEmail, enteredPassword);
    console.log(formData.form);
    formData.form.reset();
  }

}
