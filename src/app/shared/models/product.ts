import { Pagination } from "./pagination";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  quantityInStock: number;
  productType: string;
  productBrand: string;
}

export class ProductResponse {
  data: Product[] = []
  metaData: Pagination = new Pagination()
}
