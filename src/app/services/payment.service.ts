import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8083/payments';

  constructor(private http: HttpClient) {}

  getPayments(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?customerId=${customerId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
