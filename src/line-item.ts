import { Product } from "./product";
import { Invoice } from "./invoice";

export class LineItem {
  constructor(
    public invoice: Invoice,
    public product: Product,
    public quantity: number,
    public percentDiscount: number,
    public unitPrice: number,
    public extendedPrice: number
  ) {}
}
