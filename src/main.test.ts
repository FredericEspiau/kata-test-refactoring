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

const createAddress = (
  streetName: string,
  first: string,
  second: string,
  address: string,
  country: string
): Address => {
  const a = new Address(streetName, first, second, address, country);
  registerTestObject(a);
  return a;
};

const createCustomer = (
  id: number,
  firstName: string,
  secondName: string,
  points: number,
  billing: Address,
  shipping: Address
): Customer => {
  const c = new Customer(id, firstName, secondName, points, billing, shipping);
  registerTestObject(c);
  return c;
};

const createProduct = (id: number, name: string, price: number): Product => {
  const p = new Product(id, name, price);
  registerTestObject(p);
  return p;
};

const createInvoice = (customer: Customer): Invoice => {
  const i = new Invoice(customer);
  registerTestObject(i);
  return i;
};

it("add item quantity, several quantity", () => {
  //   Set up fixture
  const billingAddress = createAddress(
    "1222 1st St SW",
    "Calgary",
    "Alberta",
    "T2N 2V2",
    "Canada"
  );
  const shippingAddress = createAddress(
    "1333 1st St SW",
    "Calgary",
    "Alberta",
    "T2N 2V2",
    "Canada"
  );
  const customer = createCustomer(
    99,
    "John",
    "Doe",
    30,
    billingAddress,
    shippingAddress
  );
  const product = createProduct(88, "SomeWidget", 19.99);
  const invoice = createInvoice(customer);

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
