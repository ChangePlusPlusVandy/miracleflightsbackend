import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
const ENCRYPTION_KEY = process.env.REDIS_ENCRPYTION_KEY as string;
const ALGORITHM = 'aes-256-cbc';

/**
 * Function to encrypt a token before storing in cache
 *
 * @param token
 */
async function encrypt(token: string): Promise<string> {
  const iv = randomBytes(16);
  const cipher = createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}
/**
 *
 * @param data
 * @returns
 */
async function decrypt(data: string): Promise<string> {
  // removes the delimiter
  const [ivHex, encryptedData] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export const encryptionUtil = {
  encrypt,
  decrypt,
};
