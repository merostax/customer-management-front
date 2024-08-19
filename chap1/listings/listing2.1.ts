import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DashboardComponent } from '../../src/app/components/dashboard/dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  //fixture :Stores an instance of the ComponentFixture, which contains methods that help you debug and test a component

  let component: DashboardComponent;
  //component:Stores an instance of the ContactEditComponent

  let rootElement: DebugElement
  //rootElement—Stores the DebugElement for your component, which is how you’ll access its children

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe("init test", () => {
    it('component testing ', () => {
      expect(component).toBeTruthy();
    });
  })
});