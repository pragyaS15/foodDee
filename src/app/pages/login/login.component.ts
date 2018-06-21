import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get url from route parameters or default tp '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authService.login(this.model)
      .subscribe(
        (data: any) => {
          let user = data;
          console.log(data);
          if (data && data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log(user);
            console.log("Login Successful");
            this.router.navigate(['/dashboard']);  // this.returnUrl
          }
        }
      )
  }

  // [ngClass]="getClass()"
  getClass() {
    if(this.loading) return "btn btn-primary btn-block";
    else return "btn btn-dark btn-block";
  }
}
