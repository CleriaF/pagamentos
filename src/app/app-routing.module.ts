import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { AuthService as AuthGuard} from './services/auth/auth.service';

const APP_ROUTES: Routes = [
    {
        path: 'auth/login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'payments',
        loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'payments',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
