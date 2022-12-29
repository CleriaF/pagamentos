import { PaymentsService } from '../../services/payment/payments.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  formPayment: FormGroup;
  titleDialog = 'Adicionar Pagamento';

  constructor(
    @Optional() public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private paymentService: PaymentsService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    this.formPayment = this.fb.group({
      user: '',
      date: '',
      value: '',
      title: ''
    });
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data.payment) {
      this.titleDialog = 'Editar Pagamento';
      this.formPayment.patchValue({
        user: this.data.payment.name,
        date: this.data.payment.date,
        value: this.data.payment.value,
        title: this.data.payment.title
      });
    }
  }

  savePayment(): void {
    const payment = {
      name: this.formPayment.value.user,
      date: this.formPayment.value.date,
      title: this.formPayment.value.user,
      value: this.formPayment.value.value
    };
    if (this.data.payment) {
      this.editPayment(this.data.payment.id, payment);
    } else {
      this.createdPayment(payment);
    }
  }

  createdPayment(task): void {
    this.paymentService.saveTask(task)
      .subscribe(resp => {
        swal.fire(
          'Pagamento adicionado!',
          '',
          'success'
        );
      }, (error) => {
        swal.fire({
          icon: 'error',
          title: 'Algo deu errado.',
          text: `${error}`
        });
      });
  }

  editPayment(id, task): void {
    this.paymentService.editTask(id, task)
      .subscribe(resp => {
        swal.fire(
          'Editado com sucesso!',
          '',
          'success'
        );
      }, (error) => {
        swal.fire({
          icon: 'error',
          title: 'Algo deu errado.',
          text: `${error}`
        });
      });
  }

}
