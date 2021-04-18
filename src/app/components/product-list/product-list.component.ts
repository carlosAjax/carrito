import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/common/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Producto[];

  constructor( private productService: ProductoService) { }

  ngOnInit(): void {
    this.listaproductos();
  }

  listaproductos(){
    this.productService.getProductList().subscribe(
      data => {
        this.products = data
      } 
    )
  }

}
