import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  currentUserData;
  totalprice;
  deliveryCharges = 50;
  totalCharges = 0;

  constructor(private router: Router, private _location: Location,
    private cartService: CartService, private alertService: AlertService) { 
      this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));

      this.getItems(this.currentUserData.user.email);
    }

  ngOnInit() {
  }

  getItems(email) {
    this.cartService.getItems(email)
    .subscribe(
      (data:any) => {
        this.items = data;
        console.log(this.items);
        this.getTotal(data);
      }
    );

    //this.getTotal();
  }

  toBack(){
    this._location.back();
  }

  getTotal(items) {
    let total = 0;
    for(var i=0; i < items.length; i++) {
      if(items[i].price) {
        total += parseInt(items[i].price) * parseInt(items[i].quantity);
      }
    }
    this.totalprice = total;
    this.totalCharges = this.totalprice + this.deliveryCharges;
    localStorage.setItem('total', JSON.stringify(this.totalCharges));

    console.log("Total : " + this.totalprice);
  }

  updateItem(item) {
    let qt = parseInt(item.quantity) + 1;
    item.quantity = qt;
    console.log(item);

    this.cartService.updateItem(item)
    .subscribe(
      (data: any) => {
        console.log(data);
        if(data.message === 'Added to cart') {
          this.alertService.success('Item Added To Cart Successful', true);
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

  removeItem(item) {
    this.cartService.removeItem(item)
    .subscribe(
      (data: any) => {
        console.log(data);
        if(data.message === 'Deleted from cart!') {
          this.alertService.success('Item Removal From Cart Successful', true);
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

  toCheckout() {
    this.router.navigateByUrl('\checkout');
  }
}
