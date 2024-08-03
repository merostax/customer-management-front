import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { AddressFormComponent } from './components/address-form/address-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'addresses', component: AddressListComponent },
  { path: 'add-customer', component: CustomerFormComponent },
  { path: 'edit-customer/:id', component: CustomerFormComponent },
  { path: 'add-address', component: AddressFormComponent },
  { path: 'edit-address/:id', component: AddressFormComponent },
];
