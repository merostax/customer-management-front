import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { CustomerDTO } from '../models/customer-dto';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  describe('createCustomer', () => {
    it('should create a new customer', () => {
      const mockCustomer: Partial<CustomerDTO> = { firstName: 'kt', lastName: 'TH', email: 'kt@barthauer.de', addressId: 1, storeId: 1 };
      const mockResponse = 'Customer created successfully';

      service.createCustomer(mockCustomer, 1, 1).subscribe({
        next: (response) => {
          expect(response).toBe(mockResponse);
        },
        error: () => fail('expected a success message, not an error')
      });

      const req = httpMock.expectOne('http://localhost:8083/customers?address=1&store=1');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockResponse);
    });

    it('should handle an error response', () => {
      const mockCustomer: Partial<CustomerDTO> = { firstName: 'kt', lastName: 'TH', email: 'kt@barthauer.de', addressId: 1, storeId: 1 };

      service.createCustomer(mockCustomer, 1, 1).subscribe({
        next: () => fail('expected an error, not a success message'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.error).toBe('Bad Request');
        }
      });

      const req = httpMock.expectOne('http://localhost:8083/customers?address=1&store=1');
      expect(req.request.method).toBe('POST');

      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });
  describe('updateCustomer', () => {
    it('should update a customer', () => {
      const mockCustomer: Partial<CustomerDTO> = { id: 1, firstName: 'kt', lastName: 'TH', email: 'kt@barthauer.de', addressId: 1, storeId: 1 };

      service.updateCustomer(mockCustomer).subscribe({
        next: (response) => {
          expect(response).toEqual({});
        },
        error: () => fail('expected a success message, not an error')
      });

      const req = httpMock.expectOne('http://localhost:8083/customers/1');
      expect(req.request.method).toBe('PUT');
      req.flush({});
    });

    it('should handle an error response', () => {
      const mockCustomer: Partial<CustomerDTO> = { id: 1, firstName: 'kt', lastName: 'TH', email: 'kt@barthauer.de', addressId: 1, storeId: 1 };

      service.updateCustomer(mockCustomer).subscribe({
        next: () => fail('expected an error, not a success message'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.error).toBe('Bad Request');
        }
      });

      const req = httpMock.expectOne('http://localhost:8083/customers/1');
      expect(req.request.method).toBe('PUT');

      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer', () => {
      service.deleteCustomer(1).subscribe({
        next: (response) => {
          expect(response).toEqual({});
        },
        error: () => fail('expected a success message, not an error')
      });

      const req = httpMock.expectOne('http://localhost:8083/customers/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should handle an error response', () => {
      service.deleteCustomer(1).subscribe({
        next: () => fail('expected an error, not a success message'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          expect(error.error).toBe('Customer not found');
        }
      });

      const req = httpMock.expectOne('http://localhost:8083/customers/1');
      expect(req.request.method).toBe('DELETE');

      req.flush('Customer not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getCustomerCount', () => {
    it('should return the customer count', () => {
      const mockCount = 42;

      service.getCustomerCount().subscribe({
        next: (count) => {
          expect(count).toBe(mockCount);
        },
        error: () => fail('expected a customer count, not an error')
      });

      const req = httpMock.expectOne('http://localhost:8083/customers/count');
      expect(req.request.method).toBe('GET');
      req.flush(mockCount);
    });

    it('should handle an error response', () => {
      service.getCustomerCount().subscribe({
        next: () => fail('expected an error, not customer count'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.error).toBe('Server error');
        }
      });

      const req = httpMock.expectOne('http://localhost:8083/customers/count');
      expect(req.request.method).toBe('GET');

      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getPaymentsForCustomer', () => {
    it('should return payments for a customer', () => {
      const mockPayments = [{ paymentId: 1, amount: 100 }, { paymentId: 2, amount: 200 }];

      service.getPaymentsForCustomer(1).subscribe({
        next: (payments) => {
          expect(payments.length).toBe(2);
          expect(payments).toEqual(mockPayments);
        },
        error: () => fail('expected payments, not an error')
      });

      const req = httpMock.expectOne('http://localhost:8083/customers/1/payments');
      expect(req.request.method).toBe('GET');
      req.flush(mockPayments);
    });

    it('should handle an error response', () => {
      service.getPaymentsForCustomer(1).subscribe({
        next: () => fail('expected an error, not payments'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          expect(error.error).toBe('Payments not found');
        }
      });

      const req = httpMock.expectOne('http://localhost:8083/customers/1/payments');
      expect(req.request.method).toBe('GET');

      req.flush('Payments not found', { status: 404, statusText: 'Not Found' });
    });
  });

});
