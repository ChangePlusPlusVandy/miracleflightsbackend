import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import type { WithAuthProp } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';
dotenv.config();

/**
 * Middleware function to validate user authentication.
 * If the environment is not test, it uses ClerkExpressWithAuth to validate the user's session.
 * If the user is authenticated, it calls the next middleware function.
 * If the user is not authenticated, it returns a 403 status code.
 * If the environment is test, it calls the next middleware function without authentication.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const validateAuth = (
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) => {
  // If the environment is not test, use ClerkExpressWithAuth to validate the user's session
  if (true /*process.env.ENVIRONMENT !== 'test'*/) {
    // Use ClerkExpressWithAuth to validate the user's session then call next() if the user is authenticated
    ClerkExpressWithAuth({})(req, res, async () => {
      if (req.auth.sessionId && req.auth.userId) {
        return next();
      }

      // If the user is not authenticated, return a 403 status code
      return res.status(401).send('Unauthorized');
    });
  } else {
    // If the environment is test, call next() to continue (no authentication is required in test environment)
    return next();
  }
};

export default validateAuth;
