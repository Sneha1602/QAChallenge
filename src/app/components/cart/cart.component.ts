import {Component, OnInit, ViewChild} from '@angular/core';
import { CartService } from "../../services/cart.service";
import { Product } from "../../../models/product";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('table') table?: MatTable<any>;

  public displayedColumns: Array<string> = ['name', 'description', 'price', 'remove'];

  public products: Array<Product> = [];
  public sum: number = 0;

  constructor(private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.sum = this.cartService.getSum();
  }

  public removeFromCart(name: string) {
    this.cartService.removeProduct(name);
    this.products = this.cartService.getProducts();
    this.sum = this.cartService.getSum();

    if (this.table) {
      this.table.renderRows();
    }
  }
}
