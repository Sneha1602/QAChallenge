import { Injectable } from '@angular/core';
import { Product } from "../../models/product";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Array<Product> = [];
  private currentSum: number = 0;

  constructor(private readonly snackBar: MatSnackBar) { }

  public getSum(): number {
    return this.currentSum;
  }

  public getProducts(): Array<Product> {
    return this.products;
  }

  public addProduct(product: Product) {
    this.products.push(product);
    this.currentSum += product.price;

    this.snackBar.open(`Added ${product.name} to cart`, 'ok', {duration: 2000});
  }

  public removeProduct(name: string) {
    let product;

    let index = this.products.findIndex(p => p.name === name);
    while (index != -1) {
      product = this.products[index];
      this.products.splice(index, 1);

      index = this.products.findIndex(p => p.name === name);
    }

    if (product) {
      this.currentSum -= product.price;
    }

    this.snackBar.open(`Removed ${name} from cart`, 'ok', {duration: 2000});
  }

  public contains(name: string) {
    return this.products.findIndex(p => p.name === name) !== -1;
  }
}
