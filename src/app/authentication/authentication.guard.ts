import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly auth: Auth, private readonly router: Router) {}

  canActivate(): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          reject('No user logged in');
          this.router.navigateByUrl('/login');
        }
      });
    });
  }
}
