import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomerService } from '../../src/app/services/customer.service';
import { PaymentService } from '../../src/app/services/payment.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';



describe('CustomerService', () => {
    let service: CustomerService;
    let httpMock: HttpTestingController;
    let mockPaymentService: any;

    beforeEach(() => {
        // Create a mock for PaymentService with jest functions
        mockPaymentService = {
            getPayments: jest.fn().mockReturnValue(of([])), // Return an empty observable by default
        };

        TestBed.configureTestingModule({
            providers: [
                CustomerService,
                { provide: PaymentService, useValue: mockPaymentService },
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

    describe("testing creating and fail creation", () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
        it('should be fail', () => {
            //...................
        });
    });
    describe("testing payments and fail payments", () => {
        it('should retrieve payments for a customer', () => {
            const mockPayments = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
            const customerId = 1;
            mockPaymentService.getPayments.mockReturnValue(of(mockPayments));

            service.getPaymentsForCustomer2(customerId).subscribe((payments) => {
                expect(payments.length).toBe(2);
                expect(payments).toEqual(mockPayments);
            });
            expect(mockPaymentService.getPayments).toHaveBeenCalledWith(customerId);
        });
        it('should throw error payments for a customer', () => {
        })
    }); +

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