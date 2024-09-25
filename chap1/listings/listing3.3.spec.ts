import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerFormComponent } from '../../src/app/components/customer-form/customer-form.component';
import { CustomerDTO } from '../../src/app/models/customer-dto';
import { CustomerService } from '../../src/app/services/customer.service';

describe('CustomerFormComponent', () => {
    let component: CustomerFormComponent;
    let fixture: ComponentFixture<CustomerFormComponent>;
    // let rootElement: DebugElement;

    let customerServiceSpy: any;

    let snackBarSpy: any;
    let routerSpy: any;
    let activatedRouteSpy: any;

    beforeEach(async () => {
        customerServiceSpy = {
            getCustomerById: jest.fn(),
            updateCustomer: jest.fn().mockReturnValue(of({})),
            createCustomer: jest.fn().mockReturnValue(of({})),
        };

        snackBarSpy = {
            open: jest.fn(),
        };

        routerSpy = {
            navigate: jest.fn(),
        };

        activatedRouteSpy = {
            snapshot: {
                params: {
                    id: null,
                },
            },
        };

        await TestBed.configureTestingModule({
            imports: [
                CustomerFormComponent,
                NoopAnimationsModule
            ],
            providers: [
                FormBuilder,
                { provide: CustomerService, useValue: customerServiceSpy },
                { provide: MatSnackBar, useValue: snackBarSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: activatedRouteSpy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerFormComponent);
        component = fixture.componentInstance;
        // rootElement = fixture.debugElement;
        fixture.detectChanges();
    });
    describe('init', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });
    });

    describe(' test nginit', () => {
        it('should initialize the form and add the data if id is present', () => {
            const mockCustomer = {
                id: 1,
                firstName: 'kt',
                lastName: 'the',
                email: 'kt.the@barthauer.com',
                addressId: '123',
                storeId: '456',
            };

            activatedRouteSpy.snapshot.params.id = mockCustomer.id;
            customerServiceSpy.getCustomerById.mockReturnValue(of(mockCustomer));

            component.ngOnInit();
            fixture.detectChanges();

            expect(customerServiceSpy.getCustomerById).toHaveBeenCalledWith(mockCustomer.id);
            expect(component.customerForm.value).toEqual({
                firstName: 'kt',
                lastName: 'the',
                email: 'kt.the@barthauer.com',
                addressId: '123',
                storeId: '456',
            });
        });
    });
    describe(' test createcustomer', () => {
        const mockCustomer: Partial<CustomerDTO> = {
            firstName: 'kt',
            lastName: 'the',
            email: 'kt.the@barthauer.com',
            addressId: 123,
            storeId: 456,
        };

        it('should call createCustomer if customerId not present ', () => {
            customerServiceSpy.createCustomer.mockReturnValue(of('Customer created successfully'));
            component.customerForm.patchValue(mockCustomer);

            component.onSubmit();

            expect(customerServiceSpy.createCustomer).toHaveBeenCalledWith(mockCustomer, 123, 456);
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/customers']);
        });


        
        it('should call createCustomer if customerId is not present', () => {
            const createCustomerSpy = jest.spyOn((component as any), 'createCustomer');
            component.customerId = null; // Simulate no customerid

            component.customerForm.setValue({
                firstName: 'kt',
                lastName: 'the',
                email: 'kt.the@barthauer.com',
                addressId: 123,
                storeId: 456,
            });

            component.onSubmit();

            expect(createCustomerSpy).toHaveBeenCalled();
            expect(createCustomerSpy).toHaveBeenCalledWith(
                {
                    firstName: 'kt',
                    lastName: 'the',
                    email: 'kt.the@barthauer.com',
                    addressId: 123,
                    storeId: 456,
                },
                123,
                456
            );
        });
    })
});
