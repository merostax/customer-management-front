import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CustomerDTO } from '../models/customer-dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8083/customers';

  constructor(private http: HttpClient) { }

  listCustomers(page: number): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}?page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  getCustomerById(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createCustomer(customer: Partial<CustomerDTO>, addressId: number, storeId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}?address=${addressId}&store=${storeId}`, customer, { headers, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }


  updateCustomer(customer: Partial<CustomerDTO>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${customer.id}`, customer).pipe(
      catchError(this.handleError)
    );
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`).pipe(
      catchError(this.handleError)
    );
  }

  getPaymentsForCustomer(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/payments`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
