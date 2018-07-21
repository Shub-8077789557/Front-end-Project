import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products = [];
  constructor(private http: Http){};
  private headers = new Headers({'Content-Type': 'application/json'});

  getData(){
    this.http.get("http://localhost:5000/products").subscribe((res : Response) => {
        this.products = res.json()
    })
  }

  deleteProduct(id){
    if(confirm("Are you surely want to delete")){
      const url = `${"http://localhost:5000/products"}/${id}`;
      return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(() => {
        this.getData();
      })
    }
    
  }

  ngOnInit(){
    this.getData();
  }
}
