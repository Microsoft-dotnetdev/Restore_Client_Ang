import { Pagination } from "./pagination";

export class ShopParams {
  brandId = 0;
  typeId = 0;
  sort = 'name';
  pagination = new Pagination();
  search = '';
}