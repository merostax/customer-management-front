import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomerService } from '../../src/app/services/customer.service';

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
    });
    beforeEach(() => {
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
});