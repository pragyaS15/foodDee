import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product;
  constructor(private _location: Location) {
    this.product = JSON.parse(localStorage.getItem('product') || "{ }");
    console.log(this.product.name);
   }

  ngOnInit() {
  }

  toBack(){
    this._location.back();
  }
}
