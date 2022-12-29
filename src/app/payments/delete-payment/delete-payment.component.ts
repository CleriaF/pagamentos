import { PaymentsService } from '../../services/payment/payments.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent implements OnInit {

  user: string;
  date: string;
  value: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private paymentService: PaymentsService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.user = this.data.payment.title;
    this.date = this.data.payment.date;
    this.value = this.data.payment.value;
  }

  delete(): void {
    this.paymentService.delete(this.data.payment.id)
      .subscribe(resp => {
        swal.fire(
          'Deletado com sucesso!',
          '',
          'success'
        );
      });
  }

}
