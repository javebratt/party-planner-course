import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('/auth/login');

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'party',
    pathMatch: 'full',
  },
  {
    path: 'party',
    loadChildren: () => import('./party/party.routes').then((m) => m.routes),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.routes').then((m) => m.routes),
  },
];
