import { PaymentsService } from './payments.service';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PaymentService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ PaymentsService ]
    }));

    it('should be created', () => {
        const service: PaymentsService = TestBed.get(PaymentsService);
        expect(service).toBeTruthy();
    });

    it('should be get tasks', () => {
        const service: PaymentsService = TestBed.get(PaymentsService);
        const params = {
            _page: 1,
            _limit: 5
        };
        service.getTasks(params).subscribe(response => {
            expect(response.body.length).toEqual(5);
        });
    });

    it('should be save task', () => {
        const service: PaymentsService = TestBed.get(PaymentsService);
        const task = {
            name: 'user',
            value: 5,
            date: '02/02/2022'
        };
        service.saveTask(task).subscribe(response => {
            expect(response.code).toEqual(201);
        });
    });

    it('should be delete task', () => {
        const service: PaymentsService = TestBed.get(PaymentsService);
        service.delete(1).subscribe(response => {
            expect(response.code).toEqual(200);
        });
    });

    it('should be update task', () => {
        const service: PaymentsService = TestBed.get(PaymentsService);
        const task = {
            name: 'user',
            value: 5,
            date: '02/02/2022'
        };
        service.editTask(1, task).subscribe((response) => {
            expect(response.code).toEqual(201);
        });
    });

});
