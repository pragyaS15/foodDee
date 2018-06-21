import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  header;
  products;
  constructor(private http: HttpClient) { 
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getAll() {
    return this.http.get("https://fooddee.herokuapp.com/food/products");
  }

  getCategorized(selectedcategory){
    this.products = JSON.parse(localStorage.getItem('products'));
    console.log(this.products);

    if(selectedcategory == 'all') { 
      let allProducts = this.products;
      console.log("allProducts: ", allProducts);
      return allProducts;
    } else {
      
    let filteredfood = this.products.filter((product: any) => {
      return product.category.toLowerCase().indexOf(selectedcategory.toLowerCase()) > -1;
    });

    return filteredfood;
    }
  }

}
