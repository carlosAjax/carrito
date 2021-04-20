import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/common/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Producto[];
  currentIdCategory: number;
  modoDeBusqueda : boolean;

  constructor(
    private productService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listaproductos();
    });
  }

  listaproductos() {

    this.modoDeBusqueda = this.route.snapshot.paramMap.has("keyWord");

    if(this.modoDeBusqueda){
      this.manejadorDebusquedaDeProductos();
    }
    else{
      this.manejadorDelistaDeproductos();

    }
   
  }


  manejadorDebusquedaDeProductos() {
    const theKeyWord = this.route.snapshot.paramMap.get('keyWord');
    this.productService.buscarProducto(theKeyWord).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  manejadorDelistaDeproductos(){
    //verifica si el id del parametro es correcto
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //obtener el id y pasarlo a numero
      this.currentIdCategory = +this.route.snapshot.paramMap.get('id');
    }
    else{
      //si no coincide con ningun ruta de parametro asignar 1 por defecto
      this.currentIdCategory = 1;
    }
    this.productService.getProductList(this.currentIdCategory).subscribe((data) => {
      this.products = data;
    });

  }
}
