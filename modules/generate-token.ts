import jwt from 'jsonwebtoken';

export default function generateToken(data: any, key: string, expiresIn?: string): string {
  if (!expiresIn) return jwt.sign(data, key);
  return jwt.sign(data, key, { expiresIn });
}
