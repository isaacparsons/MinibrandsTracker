export class RequestError extends Error {
  status: number;
  message: string;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, RequestError.prototype);
    this.status = 400;
    this.message = message;
    this.name = "RequestError";
  }
}

export class NotFoundError extends Error {
  status: number;
  message: string;
  constructor(message: string) {
    super(message);
    this.status = 404;
    this.message = message;
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends Error {
  status: number;
  message: string;
  constructor(message: string) {
    super(message);
    this.status = 401;
    this.message = message;
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export const isCustomError = (error: Error) => {
  return (
    error instanceof RequestError ||
    error instanceof NotFoundError ||
    error instanceof UnauthorizedError
  );
};

export type CustomError = RequestError | NotFoundError | UnauthorizedError;
