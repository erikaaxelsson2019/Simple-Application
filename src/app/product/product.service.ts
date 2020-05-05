import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subscription } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IProduct } from '../product';
import { IndexedDbService } from '../database/indexed-db.service';

@Injectable({
providedIn: 'root'
})

export class ProductService {
    private productUrl = 'assets/api/products.json';

    sub: Subscription;
    products: IProduct[] = [];

    constructor(private http: HttpClient,
                private indexedDb: IndexedDbService) { }

    getProducts(): Observable<any> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts()
          .pipe(
            map((products: IProduct[]) => products.find(p => p.id === id)),
            catchError(this.handleError)
          );
    }

    private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {

        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
    }
}