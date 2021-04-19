import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../common/producto';
import { map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  
  constructor( private httpClient: HttpClient) { }
  
  getProductList(theCurrentId : number): Observable<Producto[]>{
    
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCurrentId}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
      );
      
    } 
    
    getListCategories(): Observable<ProductCategory []>{
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
      );
      
    }

  }
  
  interface GetResponseProducts {
  _embedded:{
    products : Producto [];
  }
}

  interface GetResponseProductCategory {
    _embedded:{
      productCategory : ProductCategory [];
    }
}


