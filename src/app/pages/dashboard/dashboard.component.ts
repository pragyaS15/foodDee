import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { FoodService } from '../../services/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products;

  constructor(
    private foodService: FoodService,
    private alertService: AlertService,
    private router: Router
  ) { 
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this.foodService.getAll()
    .subscribe(
      (data: any) => {
        this.products = data;
        localStorage.setItem('products', JSON.stringify(this.products));
        console.log(this.products);
      }
    )
  }

  toCategory(selectedItem){
    localStorage.setItem('selectedCategory', selectedItem);
    console.log(selectedItem);

    this.router.navigate(['/category/' + selectedItem]);
  }

}
