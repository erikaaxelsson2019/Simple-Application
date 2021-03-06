import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';
import { IndexedDbService } from '../database/indexed-db.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  errorMessage = '';
  sub: Subscription;
  
  product: IProduct;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
              private indexedDb: IndexedDbService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.indexedDb.get(id).subscribe({
          next: product => this.product = product,
          error: err => this.errorMessage = err
        });
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
