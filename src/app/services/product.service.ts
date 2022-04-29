import { Injectable } from '@angular/core';
import { Product } from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private sortedProducts: Array<Product> = [];
  private sortDirectionAscending: Boolean = true;

  constructor() {
    this.sortedProducts = [
      {id: 0, name: 'AssetTag', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit sed tellus sed auctor.', price: 1},
      {id: 1, name: 'BarTag', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit sed tellus sed auctor.', price: 2.5},
      {id: 3, name: 'SafeTag', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit sed tellus sed auctor.', price: 3},
      {id: 4, name: 'XTag', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit sed tellus sed auctor.', price: 4.5},
    ];
  }

  public getProduct(name: string): Product {
    return this.binarySearch(this.sortedProducts, name);
  }

  public getProducts(): Array<Product> {
    return this.sortedProducts;
  }

  public filterProducts(name: string): Array<Product> {
    return this.sortedProducts.filter(p => p.name.startsWith(name));
  }

  public setSortDirection(direction: string) {
    this.sortDirectionAscending = direction === 'asc';
    this.quicksort(this.sortedProducts, 0, this.sortedProducts.length - 1);
  }

  private binarySearch(sequence: Array<Product>, name: string): Product {
    let lower = 0;
    let upper = this.sortedProducts.length;

    while (lower != upper) {
      let m = Math.trunc((lower + upper) / 2);

      if (sequence[m].name < name) {
        lower = m + 1;
      } else {
        upper = m;
      }
    }

    return sequence[lower];
  }

  private partition(sequence: Array<Product>, lower: number, upper: number): number {
    let pivot = sequence[lower];

    let comp;
    if (this.sortDirectionAscending) {
      comp = (a: string, b: string) => a <= b;
    } else {
      comp = (a: string, b: string) => a >= b;
    }

    let j = lower + 1;
    for (let i = lower + 1; i <= upper; i++) {
      let product = sequence[i];
      if (comp(product.name, pivot.name)) {
        sequence[j], sequence[i] = sequence[i], sequence[j];
        j++;
      }
    }

    if (j <= upper) {
      [ sequence[lower], sequence[j] ] = [ sequence[j], sequence[lower] ];
    } else {
      [ sequence[lower], sequence[j-1] ] = [ sequence[j-1], sequence[lower] ];
    }

    return j-1;
  }

  private quicksort(sequence: Array<Product>, lower: number, upper: number) {
    if (upper - lower < 1) {
      return;
    }

    let pivotIndex = this.partition(sequence, lower, upper);
    this.quicksort(sequence, lower, pivotIndex - 1);
    this.quicksort(sequence, pivotIndex + 1, upper);
  }
}
