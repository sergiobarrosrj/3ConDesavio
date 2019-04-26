import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  configUrl = 'http://localhost:53611/api/';

  constructor(
    private http: HttpClient
  ) { }

  getCustomers() {
    return this.http.get(this.configUrl + 'Customers/GetAll');
  }

  getOneCustomer(id: any) {
    return this.http.get(this.configUrl + `Customers?id=${id}`);
  }

  newCustomer(customer: any) {
    customer.id = 0;
    customer.active = true;
    customer.name = customer.name;
    customer.registerDate = this.dateToEN(customer.registerDate);

    return this.http.post(this.configUrl + `Customers`, customer);
  }

  editCustomer(customer: any) {
    customer.registerDate = this.dateToEN(customer.registerDate);
    return this.http.put(this.configUrl + `Customers`, customer);
  }

  private dateToEN(date: any) {
    return date.split('/').reverse().join('-');
  }

}
