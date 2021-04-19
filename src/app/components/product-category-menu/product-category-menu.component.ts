import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories : ProductCategory[];

  constructor( private productService : ProductoService) { }

  ngOnInit(): void {
    this.listProductCategories();

  }

  listProductCategories() {
    this.productService.getListCategories().subscribe(
      data => {
        console.log('product categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }

}
