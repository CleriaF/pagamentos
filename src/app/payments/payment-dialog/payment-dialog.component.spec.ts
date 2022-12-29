import { of } from 'rxjs';
import { PaymentsService } from './../../services/payment/payments.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDialogComponent } from './payment-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PaymentDialogComponent', () => {
  let component: PaymentDialogComponent;
  let fixture: ComponentFixture<PaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [ PaymentDialogComponent ],
      providers: [ PaymentsService, { provide: MatDialog, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {payment: {
        name: 'teste',
        value: 12
      }} }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute ngOnInit', () => {
    component.ngOnInit();
    expect(component.formPayment.value).toBeTruthy();
    expect(component.formPayment.value.user).toEqual('teste');
    expect(component.titleDialog).toEqual('Editar Pagamento');
  });

  it('should execute savePayment', () => {
    const editPayment = spyOn(component, 'editPayment');
    component.savePayment();
    expect(editPayment).toHaveBeenCalled();
  });

  it('should execute createdPayment', () => {
    const service: PaymentsService = TestBed.get(PaymentsService);
    const saveTask = spyOn(service, 'saveTask').and.returnValue(of());
    component.createdPayment({});
    expect(saveTask).toHaveBeenCalled();
  });

  it('should execute editPayment', () => {
    const service: PaymentsService = TestBed.get(PaymentsService);
    const editTask = spyOn(service, 'editTask').and.returnValue(of());
    component.editPayment(1, {});
    expect(editTask).toHaveBeenCalled();
  });
});
