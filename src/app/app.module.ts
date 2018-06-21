import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './guards/auth.guard';
import { AlertComponent } from './directives/alert/alert.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SubPageComponent } from './pages/sub-page/sub-page.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './pages/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AlertComponent,
    DashboardComponent,
    SubPageComponent,
    DetailsComponent,
    CartComponent,
    OrdersComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    UserService,
    AlertService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
