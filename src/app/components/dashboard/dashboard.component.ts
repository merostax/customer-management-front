import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCustomers: number = 0;
  totalAddresses: number = 0;

  constructor(
    private customerService: CustomerService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.fetchCounts();
  }

  fetchCounts(): void {
    this.customerService.getCustomerCount().subscribe({
      next: (count) => this.totalCustomers = count,
      error: (err) => console.error('Error fetching customer count', err)
    });

    this.addressService.getAddressCount().subscribe({
      next: (count) => this.totalAddresses = count,
      error: (err) => console.error('Error fetching address count', err)
    });
  }
}
