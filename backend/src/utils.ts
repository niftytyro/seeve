// JWT Utilities
export interface UserPayload {
  id: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
