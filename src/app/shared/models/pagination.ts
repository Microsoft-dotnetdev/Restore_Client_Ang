
export class Pagination<T> {
  pageNumber = 1;
  pageSize = 6;
  totalCount = 0;
  totalPages = 0;
  data: T[] = [];
}
