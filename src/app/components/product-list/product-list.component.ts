import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../models/product";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Array<Product> = [];
  public productFilterValue: string = '';
  public sortDirection: string = 'desc';

  constructor(private readonly productService: ProductService, private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  public filterProducts() {
    if (this.productFilterValue === '') {
      this.products = this.productService.getProducts();
    } else {
      this.products = this.productService.filterProducts(this.productFilterValue);
    }
  }

  public toggleSortOrder() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.productService.setSortDirection(this.sortDirection);
    this.products = this.productService.getProducts();
  }

  public addToCart(name: string) {
    let product = this.productService.getProduct(name);
    this.cartService.addProduct(product);
  }

  public removeFromCart(name: string) {
    this.cartService.removeProduct(name);
  }

  public cartContains(name: string) {
    return this.cartService.contains(name);
  }
}
