export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class AppError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = 'AppError';
  }
}
