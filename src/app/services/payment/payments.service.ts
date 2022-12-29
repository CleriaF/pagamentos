import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    constructor(private http: HttpClient) {}

    getTasks(params: any): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(`${environment.API_URL}/tasks`, {
            observe: 'response',
            params
        });
    }

    saveTask(task): Observable<any> {
        return this.http.post<any>(`${environment.API_URL}/tasks`, task);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/tasks/${id}`);
    }

    editTask(id: number, task): Observable<any> {
        return this.http.put<any>(`${environment.API_URL}/tasks/${id}`, task);
    }
}
