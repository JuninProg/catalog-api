export class Customer {
  public readonly id: number;
  public name: string | null;
  public phone: string | null;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: Customer) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
