import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request(Functional)...`);
  next();
}

// Consider using the simpler functional middleware alternative
// any time your middleware doesn't need any dependencies.
