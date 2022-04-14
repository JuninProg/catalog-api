import { STPoint } from '../address/Address';

export class User {
  public readonly id: number;
  public name: string;
  public phone: string;
  public addressZipCode: string | null;
  public addressCity: string | null;
  public addressState: string | null;
  public addressCountry: string | null;
  public addressCoordinates: STPoint;
  public createdAt: Date;
  public updatedAt: Date | null;

  constructor(props: User) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.addressZipCode = props.addressZipCode;
    this.addressCity = props.addressCity;
    this.addressState = props.addressState;
    this.addressCountry = props.addressCountry;
    this.addressCoordinates = props.addressCoordinates;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
