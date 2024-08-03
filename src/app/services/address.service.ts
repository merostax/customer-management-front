import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AddressDTO } from '../models/address-dto';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:8083/addresses';

  constructor(private http: HttpClient) { }

  listAddresses(page: number): Observable<AddressDTO[]> {
    return this.http.get<AddressDTO[]>(`${this.apiUrl}?page=${page}`).pipe(
        catchError(this.handleError)
      );
  }

  getAddressById(id: number): Observable<AddressDTO> {
    return this.http.get<AddressDTO>(`${this.apiUrl}/${id}`);
  }

  createAddress(address: AddressDTO): Observable<any> {
    return this.http.post(this.apiUrl, address).pipe(
        catchError(this.handleError)
      );
  }

  updateAddress(id: number, address: AddressDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, address).pipe(
        catchError(this.handleError)
      );
  }

  deleteAddress(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
      );
    }

  getAddressCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
