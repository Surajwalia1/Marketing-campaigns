declare namespace Express {
    interface Request {
      user?: any; // Or define a more specific type for 'user' based on your JWT payload structure
    }
  }
  