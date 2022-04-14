import pgPromise from 'pg-promise';

export interface ICoordinates {
  lat: number;
  long: number;
}

export interface IGeoJSON {
  type: string;
  coordinates: number[];
}

export class GeoJSON {
  public geoJSON: IGeoJSON | null;

  constructor(rawGeoJSON: string | null) {
    this.geoJSON = rawGeoJSON ? JSON.parse(rawGeoJSON) : null;
  }

  toSTPoint(): STPoint {
    const coordinates: ICoordinates | null = this.geoJSON
      ? {
          long: this.geoJSON.coordinates[0],
          lat: this.geoJSON.coordinates[1],
        }
      : null;

    return new STPoint(coordinates);
  }
}

export class STPoint {
  public lat: number | null;
  public long: number | null;
  public rawType: boolean;

  constructor(coordinates: ICoordinates | null) {
    this.lat = coordinates?.lat || null;
    this.long = coordinates?.long || null;
    this.rawType = true;
  }

  toPostgres() {
    if (this.lat && this.long)
      return pgPromise.as.format('ST_SetSRID(ST_MakePoint($1, $2), 4326)', [
        this.long,
        this.lat,
      ]);
    else return pgPromise.as.format('NULL');
  }
}

export interface IAddress {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string | null;
  neighborhood: string | null;
  coordinates: STPoint;
}

export class Address {
  public readonly id: number;
  public country: string;
  public state: string;
  public city: string;
  public zipCode: string;
  public coordinates: STPoint;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(props: Address) {
    this.id = props.id;
    this.country = props.country;
    this.state = props.state;
    this.city = props.city;
    this.zipCode = props.zipCode;
    this.coordinates = props.coordinates;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
