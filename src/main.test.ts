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

    if (lineItems.length == 1) {
      const actItem: LineItem = lineItems[0];
      expect(invoice).toBe(actItem.invoice);
      expect(product).toBe(actItem.product);
      expect(5).toBe(actItem.quantity);
      expect(30).toBe(actItem.percentDiscount);
      expect(19.99).toBe(actItem.unitPrice);
      expect(69.96).toBe(actItem.extendedPrice);
    } else {
      expect("Invoice should have 1 item").not.toEqual(
        "Invoice should have 1 item"
      );
    }
  } finally {
    // Teardown
    deleteObject(invoice);
    deleteObject(product);
    deleteObject(customer);
    deleteObject(billingAddress);
    deleteObject(shippingAddress);
  }
});
