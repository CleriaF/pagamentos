import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../account/account.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private accountService: AccountService, private authService: AuthService, private router: Router) {}

    async login(email: string, password: string): Promise<boolean> {
        const users = await this.accountService.getAccount().toPromise();
        const isLoggedIn = !!users.find(u => u.email === email && u.password === password);
        this.authService.loggedIn = isLoggedIn;
        return isLoggedIn;
    }

    logout() {
        this.authService.loggedIn = false;
        this.router.navigate(['auth/login']);
    }
}
