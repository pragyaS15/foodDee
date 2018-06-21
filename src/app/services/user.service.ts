import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  header;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/x-www-form-urlencoded');
   }

  signup(user: any) {
    user.country = "India";
    console.log(user);
    return this.http.post("https://fooddee.herokuapp.com/api/register", user, { headers: this.header });
  }
}

