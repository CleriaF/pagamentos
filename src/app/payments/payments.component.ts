import { UserService } from './../services/user/user.service';
import { DeletePaymentComponent } from './delete-payment/delete-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { PaymentsService } from '../services/payment/payments.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent  } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ProfileComponent } from '../profile/profile.component';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['user', 'title', 'data', 'value', 'isPayed', 'image', 'edit', 'delete'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  totalTableItems = 0;
  pagination = {
    _page: 1,
    _limit: 5
  };

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('matMenu') menuTrigger: MatMenuTrigger;

  constructor(private paginatorIntl: MatPaginatorIntl, private paymentsService: PaymentsService, public dialog: MatDialog,
              private userService: UserService) {
    this.paginatorIntl.itemsPerPageLabel = 'Exibir';
  }

  ngOnInit(): void {
    this.findTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: PageEvent): void {
    this.pagination._page = event.pageIndex + 1;
    this.pagination._limit = event.pageSize;
    this.findTasks();
  }

  openDialog(payment): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '752px',
      height: '340px',
      data: {
        payment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.findTasks();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private findTasks(): void {
    this.paymentsService.getTasks(this.pagination)
      .subscribe(resp => {
        this.dataSource.data = resp.body;
        this.totalTableItems = +resp.headers.get('X-Total-Count') || 0;
        setTimeout(() => {
          this.paginator.length = this.totalTableItems;
          this.paginator.pageIndex = this.pagination._page - 1;
          this.paginator.pageSize = this.pagination._limit;
        });
      });
  }

  deletePayment(payment): void {
    const dialogRef = this.dialog.open(DeletePaymentComponent, {
      width: '500px',
      height: '280px',
      data: {
        payment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.findTasks();
    });
  }

  logout(): void {
    this.userService.logout();
  }

  profile(): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '440px',
      height: '470px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
