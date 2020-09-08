import { Product } from "./product";
import { Customer } from "./customer";
import { LineItem } from "./line-item";

export class Invoice {
  public lineItems: LineItem[];

  constructor(public customer: Customer) {
    this.lineItems = [];
  }

  addItemQuantity(product: Product, quantity: number) {
    this.lineItems.push(new LineItem(this, product, quantity, 10, 20, 70));
  }
}
