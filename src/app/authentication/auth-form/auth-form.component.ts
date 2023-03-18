import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @Input() actionButtonText = 'Sign In';
  @Input() isPasswordResetPage = false;
  @Output() formSubmitted = new EventEmitter<any>();
  readonly authForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([
        !this.isPasswordResetPage ? Validators.required : null,
        Validators.minLength(6),
      ]),
    ],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  submitCredentials(authForm: FormGroup): void {
    if (!authForm.valid) {
      console.log('Form is not valid yet, current value:', authForm.value);
    } else {
      const credentials = {
        email: authForm.value.email,
        password: authForm.value.password,
      };
      this.formSubmitted.emit(credentials);
    }
  }
}
