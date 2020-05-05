import { Component } from '@angular/core';
import { IndexedDbService } from './database/indexed-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-application';
  allProducts: any[];

  constructor(private indexedDb: IndexedDbService) {
    this.allProducts = [];

    let product = {
      id: 11,
      productName: "Car seat covers",
      productCode: "GDN-0035",
      releaseDate: "May 5, 2020",
      description: "protects your car seat from wear and tear",
      price: 60.95,
      imageUrl: "",
      categoryId: 4,
      category: "Car accessories",
      amount: 1
    }

   

    this.indexedDb.openDatabase();

    // this.indexedDb.get(2).subscribe(product => {
    //   console.log(product, 'from app component');
    // });
  
    // this.indexedDb.all().subscribe(products => {
    //   this.allProducts = products;
    //   console.log(products);
    // });

    // this.indexedDb.put(product).subscribe(product => {
    //   console.log(product, 'was edited from app component')
    // });


    // this.indexedDb.post(product).subscribe(product => {
    //   console.log(product, 'was added from app component')
    // });

    // this.indexedDb.delete(15).subscribe(() => {
    //   console.log('a product was deleted from app component')
    // });
  }


}
