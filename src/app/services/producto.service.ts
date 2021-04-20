import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../common/producto';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private baseUrl = 'https://tienda-prueba-v1.herokuapp.com/products';
  private categoryUrl = 'https://tienda-prueba-v1.herokuapp.com/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductList(theCurrentId: number): Observable<Producto[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCurrentId}`;
    return this.getProductos(searchUrl);
  }

  getListCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  buscarProducto(theKeyWord: string): Observable<Producto[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    return this.getProductos(searchUrl);
  }

  private getProductos(searchUrl: string): Observable<Producto[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map((response) => response._embedded.products));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Producto[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
