import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const tkn = (bearer: string): string => bearer.split(' ')[1];

const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.header('Authorization');
  if (!bearer) return res.status(401).json({ message: 'Token not found' });

  const token = tkn(bearer);

  try {
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded === 'string') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.params.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default auth;
