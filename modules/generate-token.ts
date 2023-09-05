import { variables } from '@/constants';
import jwt from 'jsonwebtoken';

function generateToken(data: any, key: string) {
  return jwt.sign(data, key, {
    expiresIn: variables.EXPIRES_IN
  });
}

export default generateToken;
