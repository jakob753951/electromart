import { ProductType } from "./ProductType";

export class Product {
  public title: string;
  public imageUrl: string;
  public basePrice: number;
  public taxRate: number;
  public discountRate: number;
  public productType: ProductType;

  constructor(title: string, imageUrl: string, basePrice: number, productType: ProductType) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.basePrice = basePrice;
    this.productType = productType;

    const parsedTaxRate = parseFloat(process.env.TAX_RATE ?? '1.25');
    this.taxRate = isNaN(parsedTaxRate) ? 1.25 : parsedTaxRate;

    const parsedDiscountRate = parseFloat(process.env.DISCOUNT_RATE ?? '0.10');
    this.discountRate = isNaN(parsedDiscountRate) ? 0.10 : parsedDiscountRate;
  }

  public getPriceWithoutTaxes(): number {
    return this.basePrice * (1 - this.discountRate);
  }

  public getPrice(): number {
    return this.getPriceWithoutTaxes() * this.taxRate;
  }
}
