import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule, RouterTestingModule ],
        providers: [ AuthService ]
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });

    it('should be get is logged in', () => {
        const service: AuthService = TestBed.get(AuthService);
        const isLoggedIn = service.isLoggedIn;
        expect(isLoggedIn).toBeUndefined();
    });

    it('should be can activate return true', () => {
        const service: AuthService = TestBed.get(AuthService);
        const result = service.canActivate();
        expect(result).toBeFalse();
    });

    it('should be can activate return false', () => {
        const service: AuthService = TestBed.get(AuthService);
        (service as any)._loggedIn = false;
        const result = service.canActivate();
        expect(result).toBeFalsy();
    });

});
