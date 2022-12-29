
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ AccountService ]
    }));

    it('should be created', () => {
        const service: AccountService = TestBed.get(AccountService);
        expect(service).toBeTruthy();
    });

    it('should be get account', () => {
        const service: AccountService = TestBed.get(AccountService);
        service.getAccount().subscribe((response: any) => {
            expect(response.email).toEqual('usuario@gmail.com');
        });
    });

});
