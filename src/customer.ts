import { Address } from "./address";

export class Customer {
  constructor(
    public id: number,
    public firstName: string,
    public secondName: string,
    public fidelityPoints: number,
    public billingAddress: Address,
    public shippingAddress: Address
  ) {}
}
