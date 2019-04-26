import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer';
import { FormValidations } from './../validations/form-validations';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  formulario: FormGroup;
  customer: Customer = new Customer();
  id: any;
  displayValue: string;
  imputValue: string;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }



  onSubmit() {
    if (this.formulario.value.id) {
      this.customerService.editCustomer(this.formulario.value).subscribe(
        () => this.router.navigate(['customers']),
        (e) => console.log(e)
      );
    } else {
      this.customerService.newCustomer(this.formulario.value).subscribe(
        () => this.router.navigate(['customers']),
        (e) => console.log(e)
      );
    }
  }

  ngOnInit() {
    this.route.params.subscribe(res => this.id = res.id);

    this.formulario = this.fb.group({
      id: [this.customer.id],
      name: [this.customer.name, [Validators.required, FormValidations.nameValidatorCuston]],
      active: [this.customer.active],
      registerDate: [this.customer.registerDate, [Validators.required]]
    });

    if (this.id) {
      this.displayValue = 'Edit';
      this.imputValue = 'Save';
      this.customerService.getOneCustomer(this.id).subscribe((res: Customer) => {
        res.registerDate = this.datePipe.transform(res.registerDate, 'dd/MM/yyyy'),
        this.formulario.setValue(res);
      });
    } else {
      this.displayValue = 'Add';
      this.imputValue = 'Create';
    }
  }
}
