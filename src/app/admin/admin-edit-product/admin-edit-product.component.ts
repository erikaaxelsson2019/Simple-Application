import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/product';
import { Subscription } from 'rxjs';
import { IndexedDbService } from 'src/app/database/indexed-db.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss']
})
export class AdminEditProductComponent implements OnInit {
  pageTitle: string;
  errorMessage: string; 
  productForm: FormGroup;
  product: IProduct;
  private sub: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
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

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.indexedDb.get(id).subscribe(product => product = this.displayProduct(product));
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  displayProduct(product: IProduct): void {
    if(this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if(this.product.id === 0) {
      console.log('product Id = 0');
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      releaseDate: this.product.releaseDate,
      price: this.product.price,
      description: this.product.description,
      imageUrl: this.product.imageUrl,
      category: this.product.category,
      amount: this.product.amount
    });
  }

  saveProduct(): void {
    if(this.productForm.valid) {
      if(this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        this.indexedDb.put(p).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err,
          complete: () => console.log('changes saved')
        });
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors';
    }

  }

  onSaveComplete(): void {
    this.productForm.reset();
    this.router.navigate(['/admin'])
  }

  deleteProduct(): void {
    if(this.product.id === 0) {
      console.log('No product was found');
      this.onSaveComplete();
    } else {
      if(confirm(`Are you sure you want to delete product: ${this.product.productName}?`)) {
        this.indexedDb.delete(this.product.id).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err,
          complete: () => console.log('aa product was deleted from the edit page')
        });
      }
    }
  }

}
