import { Item } from "./item";

export class Sale implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public price?: number,
    public area?: number,
    public region?: string,
    public type?: string,
    public date?: Date,
    public zipCode?: string,
    public zip_code?: string
  ) {
    this["@id"] = _id;
  }
}
