import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductModule } from './product/product.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CartComponent } from './cart/cart/cart.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { IndexedDbService } from './database/indexed-db.service';
import { AdminListProductsComponent } from './admin/admin-list-products/admin-list-products.component';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';
import { AdminCreateProductComponent } from './admin/admin-create-product/admin-create-product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    ShippingFormComponent,
    OrderConfirmedComponent,
    AdminListProductsComponent,
    AdminEditProductComponent,
    AdminCreateProductComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    
    ProductModule
  ],
  providers: [IndexedDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
