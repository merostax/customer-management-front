import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddressService } from '../../services/address.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AddressDTO } from '../../models/address-dto';

@Component({
  selector: 'app-address-list',
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
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit {
  addresses: AddressDTO[] = [];
  displayedColumns: string[] = ['id', 'address', 'city', 'country', 'actions'];
  totalAddresses: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(
    private addressService: AddressService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAddresses(this.currentPage);
    this.getAddressCount();
  }

  fetchAddresses(page: number) {
    this.addressService.listAddresses(page).subscribe({
      next: (data) => (this.addresses = data),
      error: (err) => this.snackBar.open('Error fetching addresses', 'Close', { duration: 2000 }),
    });
  }

  getAddressCount() {
    this.addressService.getAddressCount().subscribe({
      next: (count) => (this.totalAddresses = count),
      error: (err) => this.snackBar.open('Error fetching address count', 'Close', { duration: 2000 }),
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchAddresses(this.currentPage);
  }

  editAddress(id: number): void {
    this.router.navigate([`/edit-address/${id}`]);
  }

  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id).subscribe({
      next: () => {
        this.snackBar.open('Address deleted successfully', 'Close', { duration: 2000 });
        this.fetchAddresses(this.currentPage);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error deleting address', 'Close', { duration: 2000 });
      },
    });
  }
}
