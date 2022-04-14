import { STPoint } from '../address/Address';

export class Category {
  public readonly id: number;
  public categoryId: number | null;
  public name: string;
  public iconId: number;
  public addressId: number | null;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: Category) {
    this.id = props.id;
    this.name = props.name;
    this.iconId = props.iconId;
    this.addressId = props.addressId;
    this.categoryId = props.categoryId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}

export class CategoryAd {
  public readonly id: number;
  public categoryId: number;
  public customerId: number;
  public name: string;
  public description: string | null;
  public facebook: string | null;
  public instagram: string | null;
  public website: string | null;
  public email: string | null;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: CategoryAd) {
    this.id = props.id;
    this.categoryId = props.categoryId;
    this.customerId = props.customerId;
    this.name = props.name;
    this.description = props.description;
    this.facebook = props.facebook;
    this.instagram = props.instagram;
    this.website = props.website;
    this.email = props.email;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}

export class CategoryAdPhone {
  public readonly id: number;
  public categoryAdId: number;
  public isWhatsapp: boolean;
  public phone: string;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: CategoryAdPhone) {
    this.id = props.id;
    this.categoryAdId = props.categoryAdId;
    this.isWhatsapp = props.isWhatsapp;
    this.phone = props.phone;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}

export class CategoryAdAddress {
  public readonly id: number;
  public categoryAdId: number;
  public zipCode: string;
  public city: string;
  public state: string;
  public country: string;
  public neighborhood: string | null;
  public coordinates: STPoint;
  public street: string;
  public complement: string | null;
  public number: string;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: CategoryAdAddress) {
    this.id = props.id;
    this.categoryAdId = props.categoryAdId;
    this.neighborhood = props.neighborhood;
    this.zipCode = props.zipCode;
    this.city = props.city;
    this.state = props.state;
    this.country = props.country;
    this.coordinates = props.coordinates;
    this.street = props.street;
    this.complement = props.complement;
    this.number = props.number;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
export class CategoryAdFile {
  public readonly id: number;
  public categoryAdId: number;
  public fileType: string;
  public type: string;
  public relativePath: string;
  public sizeInBytes: number;
  public width: number | null;
  public height: number | null;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: CategoryAdFile) {
    this.id = props.id;
    this.categoryAdId = props.categoryAdId;
    this.fileType = props.fileType;
    this.type = props.type;
    this.relativePath = props.relativePath;
    this.sizeInBytes = props.sizeInBytes;
    this.width = props.width;
    this.height = props.height;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}

export class CategoryAdAction {
  public readonly id: number;
  public categoryAdId: number;
  public userId: number | null;
  public type: string;
  public description: string;
  public uuid: string;
  public createdAt: Date;
  public updatedAt: Date | null;

  constructor(props: CategoryAdAction) {
    this.id = props.id;
    this.uuid = props.uuid;
    this.categoryAdId = props.categoryAdId;
    this.userId = props.userId;
    this.type = props.type;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
