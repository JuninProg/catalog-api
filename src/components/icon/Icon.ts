export class Icon {
  public readonly id: number;
  public name: string;
  public fileType: string;
  public relativePath: string;
  public sizeInBytes: number;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: Icon) {
    this.id = props.id;
    this.name = props.name;
    this.fileType = props.fileType;
    this.relativePath = props.relativePath;
    this.sizeInBytes = props.sizeInBytes;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
