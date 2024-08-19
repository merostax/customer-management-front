import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { of } from "rxjs";
import { DashboardComponent } from "../../src/app/components/dashboard/dashboard.component";

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
    })
})
