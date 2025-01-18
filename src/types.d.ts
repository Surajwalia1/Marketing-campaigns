import { UserPayload } from './middleware/authMiddleware'; // Adjust the import path accordingly

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Ensure this matches the type used in authMiddleware.ts
    }
  }
}
