import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.css']
})
export class SubPageComponent implements OnInit {
  category;
  products;
  title;
  currentUserdata;

  constructor(private foodService: FoodService, private router: Router, private _location: Location,
  private cartService: CartService, private alertService: AlertService) {
    this.category = localStorage.getItem('selectedCategory');
    this.currentUserdata = JSON.parse(localStorage.getItem('currentUser'));
    //this.products = localStorage.getItem('products');
    //console.log(Array.isArray(this.products));
    this.getProducts(this.category);
   }

  ngOnInit() {
  }

  addtoCart(product: any) {
    product.email = this.currentUserdata.user.email;
    product.quantity = '1';
    console.log(this.currentUserdata);
    console.log(product);

    this.cartService.addItem(product)
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

  toBack(){
    this._location.back();
  }

  getProducts(item){
    this.products = this.foodService.getCategorized(item);
    console.log(this.products);
  }

  toDetails(product) {
    localStorage.setItem('product', JSON.stringify(product));
    console.log(product);
    this.router.navigate(['/details/' + product.name]);
  }

}
