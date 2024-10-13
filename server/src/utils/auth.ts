import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: { code: 'UNAUTHENTICATED' },
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}

export const authenticateToken = ({ req }: { req: any }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const secretKey: any = process.env.JWT_SECRET_KEY || '';

    const decoded = jwt.verify(token, secretKey, {maxAge: '1h'}) as JwtPayload;
    req.user = decoded;
  } catch (err) {
    console.log('Invalid token');
    throw new AuthenticationError('Invalid or expired token');
  }

  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY || '';

  if (!secretKey) {
    console.log('JWT Secret Key is required!');
  }

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};