import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { CustomerFormComponent } from './customer-form.component';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let customerServiceSpy: any;
  let snackBarSpy: any;
  let routerSpy: any;
  let activatedRouteSpy: any;
  let rootElement: DebugElement;

  beforeEach(async () => {
    customerServiceSpy = {
      getCustomerById: jest.fn(),
      updateCustomer: jest.fn(),
      createCustomer: jest.fn(),
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
        ReactiveFormsModule,
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
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });
describe('init',()=>{
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

describe(' test nginit',()=>{
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

});
