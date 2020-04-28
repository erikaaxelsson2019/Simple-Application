import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from '../app/product/product.component';
import { ProductGuard } from './product/product.guard';
import { CartComponent } from './cart/cart/cart.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';


const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { 
    path: 'products/:id', 
    canActivate: [ProductGuard],
    component: ProductComponent 
  },
  { path: 'cart', component: CartComponent },
  { path: 'shipping-form', component: ShippingFormComponent },
  { path: 'order-confirmed', component: OrderConfirmedComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
