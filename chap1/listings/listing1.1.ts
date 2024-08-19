import { DebugElement } from '@angular/core'; // —You can use DebugElement
//to inspect an element during testing. You can think of it as the native 
//HTMLEle-ment with additional methods and properties that can be useful for debugging
//elements.

//debugelement.query(By.css('.highlight-row')),,

 /*describe('saveContact() test', () => {
it('should display contact name after contact set', fakeAsync(() => {
 component.contact = { id: 1, name: 'kt' };
 component.save();
fixture.detectChanges();
const nameInput = rootElement.query(By.css('#name'));
tick();
expect(nameInput.nativeElement.value).toBe('kt');
}));
});
*/// show an example in selenium
/*------------------------------------------------------------------------------------------------------------------------------*/

import { By } from '@angular/platform-browser';
//is a class includedin the @angular/platform-browser module that you can use to select DOM ele-ments
// lets say u wanna to select this,<i class="highlight-row">
// u wanna be using something like this,query(By.css('.highlight-row')),,however theres also by.all,by.directive
/*------------------------------------------------------------------------------------------------------------------------------*/


import{ ComponentFixture,TestBed,fakeAsync,tick} from '@angular/core/testing';
//1ComponentFixture : You can use it to create a fixture that you then can use for debugging.
//1.1.Access to the Component Instance,2.Access to the Debug Element
//1.2 what is a fixture? Stores an instance of the ComponentFixture, which contains methods that help you debug and test a component

//2fakeAsync—Using :fakeAsync ensure that all asynchronous tasks are com-pleted before executing the assertions. 
//2.1Not using fakeAsync may cause the test to fail because the assertions may be executed without all of the asynchro-nous tasks not being completed. 
//2.2When using fakeAsync, you can use !!tick!! to simulate the passage of time. 

//3:TestBed api :You use this class to set up and configure your tests
//3.1 its quite extensive but will be using for now configureTestingModule, initTestEnvironment, and createComponent methods
/*------------------------------------------------------------------------------------------------------------------------------*/


import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// it disable angular animations for tests to run faster
/*------------------------------------------------------------------------------------------------------------------------------*/

import { of } from 'rxjs';
//of is used to simulate the behavior of Observables 