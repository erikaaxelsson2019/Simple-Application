import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProduct } from '../product';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public itemsInCartSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  
  private itemsInCart: IProduct[] = [];

  constructor() { 
    this.itemsInCartSubject.subscribe(p => this.itemsInCart = p);
  }

  public addToCart(item: IProduct) {
    if(this.itemsInCart.some(p => p.id == item.id))
    {
      var item = this.itemsInCart.filter(p => p.id == item.id)[0];
      item.amount += 1;
      this.itemsInCartSubject.next(this.itemsInCart);
    }
    else{
      this.itemsInCartSubject.next([...this.itemsInCart, item]);
    }
  }
  
  public getItems(): Observable<IProduct[]> {
    return this.itemsInCartSubject;
  }

  public decreaseItemFromCart(item: IProduct) {
    for(let [index, p] of this.itemsInCart.entries()) {
      if(p.id === item.id) {
        p.amount -= 1;
        // om index är noll, splice tar bort hela produkten från listan
        if(p.amount == 0) {
          this.itemsInCart.splice(index, 1);
        }
      } 
      this.itemsInCartSubject.next(this.itemsInCart);
    }
  }

  public removeFromCart(item: IProduct) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(p => p.id !== item.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  clearCart() {
    this.itemsInCart = [];
    this.itemsInCartSubject.next(this.itemsInCart)
    return this.itemsInCart;
  }
}
