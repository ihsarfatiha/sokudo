/**
 * Standard API response wrapper across all microservices / modular monolith endpoints.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | null;
  statusCode?: number;
  timestamp: string;
}

/**
 * Metadata for paginated responses.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Paginated list response wrapper.
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Standard query parameters for pagination, search, and sorting.
 */
export interface PaginationQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * API error structure with field-level details.
 */
export interface ApiErrorDetail {
  field?: string;
  message: string;
  code?: string;
}
