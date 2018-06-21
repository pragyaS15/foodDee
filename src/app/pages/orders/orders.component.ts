import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders;
  currentUserData;
  constructor(private router: Router, private _location: Location,
  private orderService: OrderService, private cartService: CartService) { 
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));

    this.getOrders(this.currentUserData.user.email);
  }

  ngOnInit() {
  }

  getOrders(email) {
    this.orderService.getOrders(email)
    .subscribe(
      (data:any) => {
        this.orders = data;
        console.log(this.orders);
      }
    );
  }

 
  toBack(){
    this._location.back();
  }
  
}
