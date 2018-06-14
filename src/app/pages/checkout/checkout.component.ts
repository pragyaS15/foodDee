import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items;
  currentUserData;
  total;
  address;
  order: any = {};

  constructor(private router: Router, private _location: Location,
    private cartService: CartService, private alertService: AlertService,
    private orderService: OrderService ) { 
      this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
      this.address = this.currentUserData.user.address;
      this.total = JSON.parse(localStorage.getItem('total'));

      this.getItems(this.currentUserData.user.email);
    }

    getItems(email) {
      this.cartService.getItems(email)
      .subscribe(
        (data:any) => {
          this.items = data;
          console.log(this.items);
        }
      );
    }

    toConfirm() {
      this.order.products = this.items;
      this.order.address = this.address;
      this.order.total = this.total;
      this.order.email = this.currentUserData.user.email;
      this.order.name = this.currentUserData.user.name;

      console.log(this.order);
      this.orderService.addOrder(this.order)
      .subscribe(
        (data: any) => {
          console.log(data);
          if(data.message === 'Order Confirmed') {
            this.alertService.success('Order Confirmation Successful', true);
            this.router.navigateByUrl('');
          } else {
            this.alertService.error(data.message, false);
          }
        },
        error => { 
          this.alertService.error(error);
          console.log('Error has occurred during adding to cart');
        }
      );
    }
  

  ngOnInit() {
  }

}
