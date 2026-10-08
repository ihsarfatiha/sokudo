import { ApiResponse, PaginatedResponse } from '@marketplace/types';

/**
 * Creates a standard successful API response object.
 */
export function createApiResponse<T>(
  data: T,
  message = 'Success',
  statusCode = 200
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    error: null,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standard error API response object.
 */
export function createErrorResponse(
  error: string,
  statusCode = 400,
  message = 'An error occurred'
): ApiResponse<null> {
  return {
    success: false,
    message,
    data: null,
    error,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standard paginated response payload with metadata.
 */
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page = 1,
  limit = 20
): PaginatedResponse<T> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.ceil(total / safeLimit);

  return {
    data,
    meta: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    },
  };
}
