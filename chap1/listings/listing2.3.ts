import { CommonModule } from "@angular/common";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import { DashboardComponent } from "../../src/app/components/dashboard/dashboard.component";
import { AddressService } from "../../src/app/services/address.service";
import { CustomerService } from "../../src/app/services/customer.service";

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
        rootElement=fixture.debugElement;
        fixture.detectChanges();
      });
});