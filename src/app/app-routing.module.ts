import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from '../app/product/product.component';
import { ProductGuard } from './product/product.guard';
import { CartComponent } from './cart/cart/cart.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { AdminListProductsComponent } from './admin/admin-list-products/admin-list-products.component';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';
import { AdminCreateProductComponent } from './admin/admin-create-product/admin-create-product.component';



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
  { path: 'admin', component: AdminListProductsComponent },
  { path: 'admin/:id/admin-edit', component: AdminEditProductComponent },
  { path: 'admin/:id/admin-create', component: AdminCreateProductComponent},
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
