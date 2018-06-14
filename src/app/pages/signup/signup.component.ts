import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  register() {
    this.loading = true;
    this.userService.signup(this.model)
      .subscribe(
        (data: any) => {
          console.log(data);
          if(data.message === 'User created') {
            this.alertService.success('Registration Successful', true);
            this.router.navigateByUrl('/login');
          } else {
            this.alertService.error(data.message, false);
          }
        },
        error => { 
          this.alertService.error(error);
          this.loading = false;
          console.log('Error has occurred during registration');
        }
      );
  }

  ngOnInit() {
  }

}
