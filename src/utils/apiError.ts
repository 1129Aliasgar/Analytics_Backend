export class ApiError extends Error {
  statusCode: number;
  data: null;
  success: boolean;
  errors: unknown[];

  constructor(
    message: string,
    statusCode: number,
    errors: unknown[] = [],
    stack = "",
    data: null = null,
    success: boolean = false,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = data;
    this.success = success;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
