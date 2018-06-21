import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  header;
  constructor(private http: HttpClient) { 
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  addItem(item: any) {
    return this.http.post("https://fooddee.herokuapp.com/cart/add", item, { headers: this.header});
  }

  getItems(email) {
    return this.http.get("https://fooddee.herokuapp.com/cart/all/?email="+email, { headers: this.header});
  }

  updateItem(item: any) {
    return this.http.post("https://fooddee.herokuapp.com/cart/update", item, { headers: this.header});
  }

  removeItem(item: any) {
    console.log("https://fooddee.herokuapp.com/cart/" + item._id);
    return this.http.delete("https://fooddee.herokuapp.com/cart/" + item._id, { headers: this.header});
  }

  removeAll(email: any) {
    return this.http.delete("https://fooddee.herokuapp.com/cart/all/" +  email, { headers: this.header});
  }
}
