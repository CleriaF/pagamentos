import { User } from './../models/user.interface';
import { AccountService } from './../services/account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.accountService.getAccount()
      .subscribe(response => {
        this.user = response[0];
      });
  }

}
