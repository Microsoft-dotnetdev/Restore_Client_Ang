import { Pagination } from "./pagination";

export class ShopParams {
  brandId = '';
  typeId = '';
  sort = 'name';
  pagination = new Pagination();
  search = '';
}