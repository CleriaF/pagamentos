import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/services/payment/payments.service';

import { DeletePaymentComponent } from './delete-payment.component';

describe('DeletePaymentComponent', () => {
  let component: DeletePaymentComponent;
  let fixture: ComponentFixture<DeletePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ DeletePaymentComponent ],
      providers: [ PaymentsService, { provide: MatDialog, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {payment: {
        name: 'teste',
        value: '12'
      }} }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute ngOnInit', () => {
    const initData = spyOn(component, 'initData');
    component.ngOnInit();
    expect(initData).toHaveBeenCalled();
  });

  it('should execute initData', () => {
    component.initData();
    expect(component.value).toEqual('12');
  });

  it('should execute delete', () => {
    const service: PaymentsService = TestBed.get(PaymentsService);
    const deleteCall = spyOn(service, 'delete').and.returnValue(of());
    component.delete();
    expect(deleteCall).toHaveBeenCalled();
  });
});
