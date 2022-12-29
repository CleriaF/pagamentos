import { MatMenuModule } from '@angular/material/menu';
import { DeletePaymentComponent } from './delete-payment/delete-payment.component';
import { PaymentsService } from './../services/payment/payments.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsComponent } from './payments.component';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatMenuModule
      ],
      declarations: [ PaymentsComponent, DeletePaymentComponent ],
      providers: [ PaymentsService, { provide: MatDialog, useValue: {} }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute ngOnInit', () => {
    const service: PaymentsService = TestBed.get(PaymentsService);
    const callGetTasks = spyOn(service, 'getTasks').and.returnValue(of());
    component.ngOnInit();
    expect(callGetTasks).toHaveBeenCalled();
  });

  it('should execute ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBeUndefined();
  });

  it('should execute onPageChange', () => {
    const service: PaymentsService = TestBed.get(PaymentsService);
    const callGetTasks = spyOn(service, 'getTasks').and.returnValue(of());
    component.onPageChange(new PageEvent());
    expect(callGetTasks).toHaveBeenCalled();
  });

  it('should execute applyFilter', () => {
    const event = { target: { value: '42' }};
    component.applyFilter(event as unknown as Event);
    expect(component.dataSource).toBeTruthy();
  });
});
