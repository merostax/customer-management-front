import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'store', 'address', 'actions'];
  totalCustomers: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar,private router: Router) {}

  ngOnInit(): void {
    this.fetchCustomers(this.currentPage);
    this.getCustomerCount();
  }

  fetchCustomers(page: number) {
    this.customerService.listCustomers(page).subscribe({
      next: (data) => {
        this.customers = data;
        console.log('Fetched customers:', data); 
      },
      error: (err) => {
        console.error('Error fetching customers:', err); 
        this.snackBar.open('Error fetching customers', 'Close', { duration: 2000 });
      },
    });
  }
  

  getCustomerCount() {
    this.customerService.getCustomerCount().subscribe({
      next: (count) => (this.totalCustomers = count),
      error: (err) => this.snackBar.open('Error fetching customer count', 'Close', { duration: 20000 }),
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchCustomers(this.currentPage);
  }

  getStoreLink(customer: any): string {
    return customer.store?.href || 'N/A';
  }

  getAddressLink(customer: any): string {
    return customer.address?.href || 'N/A';
  }

  editCustomer(id: number): void {
    this.router.navigate([`/edit-customer/${id}`]);
  }

  deleteCustomer(id: number): void {
  }
}
