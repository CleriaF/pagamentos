import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule, RouterTestingModule ],
        providers: [ UserService ]
    }));

    it('should be created', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });

    it('should be get account', () => {
        const service: UserService = TestBed.get(UserService);
        service.login('usuario@gmail.com', 'usuario').then(response => {
            expect(response).toBeTrue();
        });
    });

    it('should be logout', () => {
        const authService: AuthService = TestBed.get(AuthService);
        const service: UserService = TestBed.get(UserService);
        service.logout();
        expect(authService.loggedIn).toBeFalsy();
    });

});
