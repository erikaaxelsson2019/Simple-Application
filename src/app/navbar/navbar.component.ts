import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Observable } from 'rxjs';
import { IProduct } from '../product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public shoppingCartItems$: Observable<IProduct[]>;
  public itemsInCartCount: number = 0;

  constructor(private cartService: CartService) {
    this.shoppingCartItems$ = this.cartService.getItems();

    this.shoppingCartItems$.subscribe(_ => _);
    this.cartService.itemsInCartSubject.subscribe(products => { 
      if(products.length > 0) {
        this.itemsInCartCount = products.map(item => {
          console.log(item.amount)
          return item.amount 
  
        }).reduce((sum, amount) => sum += amount);
      } else {
        this.itemsInCartCount = 0;
      }
    });
  }

  ngOnInit(): void {
  }

}
