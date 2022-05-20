import {Model} from "../../core/model/model";

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

export class Stock extends Model {
  qte!: number;
  productId!: number;
  dateStock!: Date;


  constructor(qte: number, productId: number) {
    super();
    this.qte = qte;
    this.productId = productId;
    this.dateStock = new Date(Date.now());
  }
}
