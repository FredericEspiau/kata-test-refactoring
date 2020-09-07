/* eslint-disable jest/no-conditional-expect,@typescript-eslint/no-unsafe-call */
import { Address } from "./address";
import { Customer } from "./customer";
import { Product } from "./product";
import { Invoice } from "./invoice";
import { LineItem } from "./line-item";

const deleteObject = (a: unknown) => a;

expect.extend({
  uniqueItemToBe(received: unknown[], expected) {
    if (received.length !== 1) {
      return {
        message: () => `length should be 1`,
        pass: false,
      };
    }

    if (received[0] !== expected) {
      return {
        message: () => `items are not the same`,
        pass: false,
      };
    }

    return {
      message: () => `everything is ok`,
      pass: true,
    };
  },
});

let testObjects: unknown[];

beforeEach(() => {
  testObjects = [];
});

const registerTestObject = (o: unknown): void => {
  testObjects.push(o);
};

it("add item quantity, several quantity", () => {
  //   Set up fixture
  const billingAddress = new Address(
    "1222 1st St SW",
    "Calgary",
    "Alberta",
    "T2N 2V2",
    "Canada"
  );
  registerTestObject(billingAddress);
  const shippingAddress = new Address(
    "1333 1st St SW",
    "Calgary",
    "Alberta",
    "T2N 2V2",
    "Canada"
  );
  registerTestObject(shippingAddress);
  const customer = new Customer(
    99,
    "John",
    "Doe",
    30,
    billingAddress,
    shippingAddress
  );
  registerTestObject(customer);
  const product = new Product(88, "SomeWidget", 19.99);
  registerTestObject(product);
  const invoice = new Invoice(customer);
  registerTestObject(invoice);

  // Exercise SUT
  invoice.addItemQuantity(product, 5); // Verify outcome
  const expected: LineItem = new LineItem(
    invoice,
    product,
    5,
    30,
    19.99,
    69.96
  );
  expect(invoice).uniqueItemToBe(expected);
});

afterEach(() => {
  testObjects.forEach((o) => {
    try {
      deleteObject(o);
    } catch (e) {
      // nothing to do
    }
  });
});
