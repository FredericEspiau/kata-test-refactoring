/* eslint-disable jest/no-conditional-expect,@typescript-eslint/no-unsafe-call */
import { Address } from "./address";
import { Customer } from "./customer";
import { Product } from "./product";
import { Invoice } from "./invoice";
import { LineItem } from "./line-item";

const deleteObject = (a: unknown) => a;

it("add item quantity, several quantity", () => {
  let billingAddress: Address | null = null;
  let shippingAddress: Address | null = null;
  let customer: Customer | null = null;
  let product: Product | null = null;
  let invoice: Invoice | null = null;

  try {
    //   Set up fixture
    billingAddress = new Address(
      "1222 1st St SW",
      "Calgary",
      "Alberta",
      "T2N 2V2",
      "Canada"
    );
    shippingAddress = new Address(
      "1333 1st St SW",
      "Calgary",
      "Alberta",
      "T2N 2V2",
      "Canada"
    );
    customer = new Customer(
      99,
      "John",
      "Doe",
      30,
      billingAddress,
      shippingAddress
    );
    product = new Product(88, "SomeWidget", 19.99);
    invoice = new Invoice(customer);

    // Exercise SUT
    invoice.addItemQuantity(product, 5); // Verify outcome
    const lineItems: LineItem[] = invoice.lineItems;

    expect(lineItems.length).toBe(1);

    const expected: LineItem = new LineItem(
      invoice,
      product,
      5,
      30,
      19.99,
      69.96
    );
    const actual: LineItem = lineItems[0];
    expect(actual).toStrictEqual(expected);
  } finally {
    // Teardown
    deleteObject(invoice);
    deleteObject(product);
    deleteObject(customer);
    deleteObject(billingAddress);
    deleteObject(shippingAddress);
  }
});
