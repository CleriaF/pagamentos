import { User } from '../../models/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClient) {}

    getAccount(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.API_URL}/account`);
    }
}
