import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddressDTO } from '../../models/address-dto';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  addressId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      address2: [''],
      district: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.addressId = this.route.snapshot.params['id'];
    if (this.addressId) {
      this.addressService.getAddressById(this.addressId).subscribe({
        next: (address: AddressDTO) => {
          this.addressForm.patchValue(address);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error fetching address data', 'Close', { duration: 2000 });
        },
      });
    }''
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const address: AddressDTO = this.addressForm.value;
      if (this.addressId) {
        this.addressService.updateAddress(this.addressId, address).subscribe({
          next: () => {
            this.snackBar.open('Address updated successfully', 'Close', { duration: 2000 });
            this.router.navigate(['/addresses']);
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Error updating address', 'Close', { duration: 2000 });
          },
        });
      } else {
        this.addressService.createAddress(address).subscribe({
          next: () => {
            this.snackBar.open('Address created successfully', 'Close', { duration: 2000 });
            this.router.navigate(['/addresses']);
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Error creating address', 'Close', { duration: 2000 });
          },
        });
      }
    }
  }
}
