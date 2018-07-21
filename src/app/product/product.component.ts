import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  productsObj : {};
       constructor(private http : Http, private router : Router){}

       productSubmit(products){
         this.productsObj = {
            "name" : products.name,
            "price" : products.price  
         }

         this.http.post("http://localhost:5000/products", this.productsObj).subscribe((res:Response) => {
           alert("Product has been added!!");
           this.router.navigate(["/"]);
         })
       }
}
