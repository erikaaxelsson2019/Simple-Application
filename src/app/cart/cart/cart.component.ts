import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  pageTitle = 'Cart';
  imageWidth: number = 40;
  imageMargin: number = 2;
  cartTotal = 0;
  disabled: boolean;

  public shoppingCartItems$: Observable<IProduct[]> = of([]);

  public shoppingCartItems: IProduct[] = [];

  constructor(private cartService: CartService) { 
    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe(p => this.shoppingCartItems = p);
  }
  

  ngOnInit() {
    this.cartService.itemsInCartSubject.subscribe(productsInCart => {
      console.log(productsInCart);
      if(productsInCart.length > 0) {
        this.cartTotal = productsInCart.map(item => item.price * item.amount).reduce((sum, item) => sum += item);
        this.disabled = false;
        console.log(this.cartTotal)
      } else {
        this.cartTotal = 0;
        this.disabled = true;
      }
    });
  }

  public decreaseItem(item: IProduct) {
    this.cartService.decreaseItemFromCart(item);
  }

  public addItem(item: IProduct) {
    this.cartService.addToCart(item);
  }

  public removeItem(item: IProduct) {
    this.cartService.removeFromCart(item)
  }

}
