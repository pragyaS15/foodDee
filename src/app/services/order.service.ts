import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  header;
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/x-www-form-urlencoded');
   }

   addOrder(order: any) {
     return this.http.post("https://fooddee.herokuapp.com/order/add", order, { headers: this.header });
   }

   getOrders(email) {
     return this.http.get("https://fooddee.herokuapp.com/order/all/?email="+email, { headers: this.header});
   }
}
