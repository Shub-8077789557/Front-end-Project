import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit  {

  id: number;
  data: object = {};
  products = [];
  productObj: object = {};
  exist = false;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private router: Router, private aroute: ActivatedRoute, private http: Http) { }

  UpdateSubmit(product) {
    this.productObj = {
      "name": product.name,
      "price": product.price
    };

    const url = `${"http://localhost:5000/products"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.productObj), { headers: this.headers })
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })
  }

  ngOnInit() {
    this.aroute.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http.get("http://localhost:5000/products").subscribe(
      (res: Response) => {
        this.products = res.json();
        for (let i = 0; i < this.products.length; i++) {
          if (parseInt(this.products[i].id) === this.id) {
            this.exist = true;
            this.data = this.products[i];
            break;
          } else {
            this.exist = false;
          }
        }
      }
    )
  }
   

}
