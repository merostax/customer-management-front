import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from '../../src/app/components/dashboard/dashboard.component';
import { AddressService } from '../../src/app/services/address.service';
import { CustomerService } from '../../src/app/services/customer.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let rootElement: DebugElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        CommonModule,
        RouterModule.forRoot([]),
        MatButtonModule,
        MatSnackBarModule,
      ],
      // WE ADD THE MISSING IMPORTS
      // ADDING SOME MODULE FOR TEST TO RUN FASTER LIKE NOOPANIMATIONMODULE
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    rootElement=fixture.debugElement;
    fixture.detectChanges();
  });


  describe("init test", () => {
    it('component testing ', () => {
      expect(component).toBeTruthy();
    });
  })
});