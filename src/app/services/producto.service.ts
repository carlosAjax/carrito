import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../common/producto';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = 'http://localhost:8080/api/products'

  constructor( private httpClient: HttpClient) { }

  getProductList(): Observable<Producto[]>{

    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    )

  } 

}

interface GetResponse {
  _embedded:{
    products : Producto [];
  }
}


