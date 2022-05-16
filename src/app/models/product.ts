export class Model {
  id !: number;
}

export class Product extends Model {
  productName !: string;
  productDescription !: string;
  productPrice !: number;


  constructor(productName: string, productDescription: string, productPrice: number) {
    super();
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
  }
}
