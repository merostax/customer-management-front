import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CustomerService } from '../../services/customer.service';
import { AddressService } from '../../services/address.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let rootElement: DebugElement
  let customerServiceSpy: any;
  let addressServiceSpy: any;
  beforeEach(async () => {
    customerServiceSpy = {
      getCustomerCount: jest.fn().mockReturnValue(of(0)),
    };

    addressServiceSpy = {
      getAddressCount: jest.fn().mockReturnValue(of(0)),
    };

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        CommonModule,
        RouterModule.forRoot([]),
        MatButtonModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: AddressService, useValue: addressServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('init component', () => {
    expect(component).toBeTruthy();
  });
  // no need for fakeasync since of emiting value immediately
  it('should fetch customers and addressess , should get totalvalue correct ', fakeAsync(() => {
    const mockCustomerCount = 10;
    const mockAddressCount = 20;

    customerServiceSpy.getCustomerCount.mockReturnValue(of(mockCustomerCount));
    addressServiceSpy.getAddressCount.mockReturnValue(of(mockAddressCount));

    component.ngOnInit();
    tick();
    expect(customerServiceSpy.getCustomerCount).toHaveBeenCalled();
    expect(addressServiceSpy.getAddressCount).toHaveBeenCalled();
    expect(component.totalCustomers).toBe(mockCustomerCount);
    expect(component.totalAddresses).toBe(mockAddressCount);
  }));
  it('it should have inital value of 0 for totalcustomer,totaladdresses', () => {
    const customerElement: DebugElement = rootElement.query(By.css('#total-customers'));
    const addressElement: DebugElement = rootElement.query(By.css('#total-addresses'));

    expect(customerElement.nativeElement.textContent).toBe('0');
    expect(addressElement.nativeElement.textContent).toBe('0');
  });
});
