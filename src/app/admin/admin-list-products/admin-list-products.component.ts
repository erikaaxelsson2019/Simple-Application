import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from 'src/app/database/indexed-db.service';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/product';

@Component({
  selector: 'app-admin-list-products',
  templateUrl: './admin-list-products.component.html',
  styleUrls: ['./admin-list-products.component.scss']
})
export class AdminListProductsComponent implements OnInit {
  sub: Subscription;
  errorMessage: string;
  products: IProduct[] = [];

  constructor(private indexedDb: IndexedDbService) { }

  ngOnInit(): void {
   this.loadProducts();
  }

  loadProducts(): void {
    this.sub = this.indexedDb.all().subscribe(products => {
      this.products = products;
    })
  }

  deleteProduct(id): void {
    if(confirm(`Are you sure you want to delete this product?`)) {
      this.indexedDb.delete(id).subscribe({
        next: () => this.loadProducts(),
        error: err => this.errorMessage = err,
        complete: () => console.log('aa product was deleted from the admin list view')
      });
    } 
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
