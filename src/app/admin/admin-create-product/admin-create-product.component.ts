import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/product';
import { Router } from '@angular/router';
import { IndexedDbService } from 'src/app/database/indexed-db.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-admin-create-product',
  templateUrl: './admin-create-product.component.html',
  styleUrls: ['./admin-create-product.component.scss']
})
export class AdminCreateProductComponent implements OnInit {
  errorMessage: string; 
  productForm: FormGroup;
  product: IProduct;
  private sub: Subscription;

  constructor(private fb: FormBuilder,
              private router: Router,
              private indexedDb: IndexedDbService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,  
                        Validators.minLength(3),
                        Validators.maxLength(20)]],
      productCode: ['', Validators.required],
      releaseDate: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', [Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(100)]],
      imageUrl: '',
      category: '',
      amount: 1
    });
  }

  createProduct(product): void {

    if(this.productForm.valid) {
      if(this.productForm.dirty) {
        product = { ...this.product, ...this.productForm.value };

        this.indexedDb.post(product).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err,
          complete: () => console.log(`${product.productName}: was added to the list`)
        });
        
      } else {
        this.errorMessage = 'Please correct the validation errors';
      }
    }
  }

  onSaveComplete(): void {
    this.productForm.reset();
    this.router.navigate(['/admin']);
  }

}
