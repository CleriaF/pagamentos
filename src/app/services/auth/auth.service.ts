import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _loggedIn: boolean;

    constructor(private router: Router) {}

    get isLoggedIn(): boolean {
        return this._loggedIn;
    }

    set loggedIn(loggedIn: boolean) {
        this._loggedIn = loggedIn;
    }

    canActivate() {
        if (this.isLoggedIn) {
            return true;
        }
        this.router.navigate(['auth/login']);
        return false;
    }
}
