import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerFormComponent } from '../../src/app/components/customer-form/customer-form.component';
import { CustomerService } from '../../src/app/services/customer.service';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let rootElement: DebugElement;

  let customerServiceSpy: any;
  
  let snackBarSpy: any;
  let routerSpy: any;
  let activatedRouteSpy: any;

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
  
  describe('init', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

})