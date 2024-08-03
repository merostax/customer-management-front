import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerDTO } from '../../models/customer-dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addressId: ['', Validators.required],
      storeId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe({
        next: (customer: CustomerDTO) => {
          this.customerForm.patchValue(customer);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error fetching customer data', 'Close', { duration: 2000 });
        },
      });
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customer: Partial<CustomerDTO> = this.customerForm.value;
      const addressId = this.customerForm.value.addressId || 0; // Use 0 or a default value if undefined
      const storeId = this.customerForm.value.storeId || 0; // Use 0 or a default value if undefined

      if (this.customerId) {
        this.customerService.updateCustomer({ ...customer, id: this.customerId }).subscribe({
          next: () => {
            this.snackBar.open('Customer updated successfully', 'Close', { duration: 2000 });
            this.router.navigate(['/customers']);
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open(`Error updating customer: ${err.error.message}`, 'Close', { duration: 2000 });
          },
        });
      } else {
        this.customerService.createCustomer(customer, addressId, storeId).subscribe({
          next: (response) => {
            this.snackBar.open(response, 'Close', { duration: 2000 });
            this.router.navigate(['/customers']);
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open(`Error creating customer: ${err.error.message}`, 'Close', { duration: 2000 });
          },
        });
      }
    }
  }
}
