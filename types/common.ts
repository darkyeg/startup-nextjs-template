export interface IPagination {
  /**
   * The limit of items per page for pagination.
   */
  limit?: number;
  /**
   * The page number for pagination.
   */
  page?: number;
  /**
   * The search query string.
   */
  q?: string;
}

export interface IPaginationResult<T> {
  /**
   * The paginated data.
   */
  items: T[];
  /**
   * The total count of items.
   */
  total: number;
}
