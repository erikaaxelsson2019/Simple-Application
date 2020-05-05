import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


export interface IDataService {
  get(id: number): any;
  put(product): any;
  post(product): any;
  delete(id: number): any;
  all();
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService implements IDataService{
  private productUrl = 'assets/api/products.json';

  constructor(private http: HttpClient) {}


  // funkar
  get(id: number): Observable<any> {

    return Observable.create((observer: any) => {
      this.openDatabase().subscribe((db: any) => {
        let tx = db.transaction(["products"]);
        let store = tx.objectStore("products");
        let request = store.get(id);

        request.onsuccess = function() {
          var matching = request.result;
          if(matching !== undefined) {
            //match was found
            console.log(matching);
            observer.next(matching);
            observer.complete();
          } else {
            //no match was found
            console.log('no match was found')
          }
        };
      })
    })
  }

  //funkar
  put(product): Observable<any> {

    return Observable.create((observer: any) => {
      this.openDatabase().subscribe((db: any) => {
        let tx = db.transaction(["products"], "readwrite");
        let store = tx.objectStore("products");
        let request = store.put(product)

        request.onsuccess = (e: any) =>  {
          observer.next(e.target.result);
          observer.complete();
          console.log("aa product was edited!")
          db.close();
        } 

        request.onerror = (e: any) => {
          console.log('could not edit product')
          db.close();
        }
      })
    })
  }

  //funkar
  post(product): Observable<any> {
    
    return Observable.create((observer: any) => {
      this.openDatabase().subscribe((db: any) => {
        let tx = db.transaction(["products"], "readwrite");
        let store = tx.objectStore("products");
        let request = store.add(product)

        request.onsuccess = (e: any) => {
          observer.next(e.target.result);
          observer.complete();
          console.log("aa product was added!")
          db.close();
        } 

        request.onerror = (e: any) =>  {
          console.log('could not add product')
          db.close();
        }
      })
    })
  }

  // funkar nästan?? kan radera id som inte finns
  delete(id: number): Observable<any> {
    
    return Observable.create((observer: any) => {
      this.openDatabase().subscribe((db: any) => {
        let tx = db.transaction(["products"], "readwrite");
        let store = tx.objectStore("products");
        let request = store.delete(id);

        request.onsuccess = (e: any) => {
          observer.next(id);
          observer.complete();
          console.log("a product was deleted")
          db.close();
        }

        request.onerror = (e: any) =>{
          console.log('something went wrong when trying to delete product')
          db.close();
        }
      })
    })
  }

  // Tror den funkar
  all(): Observable<any[]> {

    return Observable.create((observer: any) => {
      this.openDatabase().subscribe((db: any) => {
        let tx = db.transaction(["products"], "readonly");
        let store = tx.objectStore("products");
        let request = store.openCursor();
        let results: any[] = [];

        request.onsuccess = function() {
          let cursor = request.result;

          if(cursor) {
            results.push(cursor.value);
            cursor.continue();
          } else {
            observer.next(results);
            db.close();
            observer.complete();
            console.log('All products fetched')
          }
        }

        request.onerror = (e: any) => {
          console.log('something went wrong when getting productlist');
          db.close();
        }
      })
    })
  }

  public openDatabase(): Observable<any> {
      return new Observable<any>(observer => {

      if(!window.indexedDB) {
        window.alert('your browser do not suport indexedDb')
      }

      var db;

      var openRequest = indexedDB.open("testDatabase")

      openRequest.onupgradeneeded = function(event) {
          var db = openRequest.result;
          var store = db.createObjectStore("products", {keyPath: "id",  autoIncrement: true});
          
          store.put({
            productName: "Leaf Rake",
            productCode: "GDN-0011",
            releaseDate: "March 19, 2019",
            description: "Leaf rake with 48-inch wooden handle.",
            price: 19.95,
            imageUrl: "assets/images/leaf_rake.png",
            categoryId: 2,
            category: "Garden",
            amount: 1
          });

          store.put({
            productName: "Garden Cart",
            productCode: "GDN-0023",
            releaseDate: "March 18, 2019",
            description: "15 gallon capacity rolling garden cart",
            price: 32.99,
            imageUrl: "assets/images/garden_cart.png",
            categoryId: 2,
            category: "Tool",
            amount: 1
          });

          store.put({
            productName: "Hammer",
            productCode: "TBX-0048",
            releaseDate: "May 21, 2019",
            description: "Curved claw steel hammer",
            price: 8.9,
            imageUrl: "assets/images/hammer.png",
            categoryId: 1,
            category: "Garden",
            amount: 1
          });

          store.put({
            productName: "Saw",
            productCode: "TBX-0022",
            releaseDate: "May 15, 2019",
            description: "15-inch steel blade hand saw",
            price: 11.55,
            imageUrl: "assets/images/saw.png",
            categoryId: 1,
            category: "Tool",
            amount: 1
          });

          store.put({
            productName: "Video Game Controller",
            productCode: "GMG-0042",
            releaseDate: "October 15, 2018",
            description: "Standard two-button video game controller",
            price: 35.95,
            imageUrl: "assets/images/xbox-controller.png",
            categoryId: 3,
            category: "Game",
            amount: 1
          });
          
          
          window.alert('upgrade is called')
      }

      openRequest.onsuccess = function(event) {
          db = openRequest.result;
          observer.next(db);
          observer.complete();
      }

      openRequest.onerror = function(event) {
          window.alert('error accourd')
          
      }

    })
  }
  
}
