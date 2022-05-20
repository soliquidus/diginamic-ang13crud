import {Model} from "../../core/model/model";

export class Customer extends Model {
  firstName!: string
  lastName!: string
  email!: string


  constructor(firstName: string, lastName: string, email: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
