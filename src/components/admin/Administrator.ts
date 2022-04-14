export class Administrator {
  public readonly id: number;
  public isMaster: boolean;
  public name: string;
  public phone: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: Administrator) {
    this.id = props.id;
    this.isMaster = props.isMaster;
    this.name = props.name;
    this.phone = props.phone;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
