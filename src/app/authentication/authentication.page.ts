import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  readonly url: string = this.router.url.substr(1);
  pageTitle = 'Sign In';
  actionButtonText = 'Sign In';
  constructor(
    private readonly router: Router,
    private readonly auth: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.url === 'signup') {
      this.pageTitle = 'Create your Account';
      this.actionButtonText = 'Create Account';
    }

    if (this.url === 'reset') {
      this.pageTitle = 'Reset your Password';
      this.actionButtonText = 'Reset Password';
    }
  }

  handleUserCredentials(userCredentials: any) {
    // This method gets the form value from the authentication component
    // And depending on the URL, it calls the respective method.
    const { email, password } = userCredentials;
    switch (this.url) {
      case 'login':
        this.login(email, password);
        break;
      case 'signup':
        this.signup(email, password);
        break;
      case 'reset':
        this.resetPassword(email);
        break;
    }
  }

  async login(email: string, password: string) {
    try {
      await this.auth.login(email, password);
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(
        `Either we couldn't find your user or there was a problem with the password`
      );
    }
  }

  async signup(email: string, password: string) {
    try {
      await this.auth.signup(email, password);
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(email: string) {
    try {
      await this.auth.resetPassword(email);
      console.log('Email Sent');
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
