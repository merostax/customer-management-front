import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let rootElement: DebugElement;

  let customerServiceSpy: any;
  let routerSpy: any;
  let activatedRouteSpy: any;

  beforeEach(async () => {
    customerServiceSpy = {
      listCustomers: jest.fn().mockReturnValue(of([])),
      getCustomerCount: jest.fn().mockReturnValue(of(0)),
    };


    routerSpy = {
      navigate: jest.fn(),
    };

    activatedRouteSpy = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue(null),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        CustomerListComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });
  describe('init', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });


  describe('ngOnInit', () => {
    it('should fetch and get count customers', () => {
      customerServiceSpy.listCustomers.mockReturnValue(of([{ id: 1, firstName: 'kt', lastName: 'the', email: 'kt.the@barthauer.de' }]));
      customerServiceSpy.getCustomerCount.mockReturnValue(of(1));

      component.ngOnInit();

      fixture.detectChanges();
      expect(customerServiceSpy.listCustomers).toHaveBeenCalledWith(1);
      expect(customerServiceSpy.getCustomerCount).toHaveBeenCalled();
      expect(component.customers.length).toBe(1);
      expect(component.totalCustomers).toBe(1);
    });
  });


  describe('test editCustomer', () => {
    it('schould navigate  edit-customer/:id editcustomer icon is clicked', () => {
      const customerId = 1;
      component.editCustomer(customerId);
      expect(routerSpy.navigate).toHaveBeenCalledWith([`/edit-customer/${customerId}`]);
    });
  });


  describe('test handlePageEvent', () => {

    it('it should update page and fetch', () => {
      const pageEvent = { pageIndex: 1, pageSize: 20 } as PageEvent;
      const fetchCustomersSpy = jest.spyOn(component,'fetchCustomers');
      component.handlePageEvent(pageEvent);
      fixture.detectChanges();

      expect(component.currentPage).toBe(2);
      expect(component.pageSize).toBe(20);
      expect(fetchCustomersSpy).toHaveBeenCalledWith(2);
    });
  })

});
