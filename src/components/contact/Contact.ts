export class Contact {
  public readonly id: number;
  public name: string;
  public phone: string;
  public description: string;
  public createdAt: Date;

  constructor(props: Contact) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.description = props.description;
    this.createdAt = props.createdAt;
  }
}
