import axios from 'axios';
import { randomBytes, createHash } from 'crypto';

const httpClient = axios.create({
  // Set a reasonable timeout so CLI commands fail fast if the remote API stalls
  timeout: 10000,
});

export class UtilityService {
  async getJoke() {
    const response = await httpClient.get('https://official-joke-api.appspot.com/jokes/programming/random');
    return response.data[0];
  }

  async getIP() {
    const response = await httpClient.get('https://ipapi.co/json/');
    return response.data;
  }

  async getPokemon() {
    const response = await httpClient.get('https://pokeapi.co/api/v2/pokemon/pikachu');
    return response.data;
  }

  generateUUID(count: number = 1): string[] {
    const uuids: string[] = [];
    for (let i = 0; i < count; i++) {
      const bytes = randomBytes(16);
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      
      const hex = bytes.toString('hex');
      const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
      uuids.push(uuid);
    }
    return uuids;
  }

  generatePassword(length: number = 16): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const bytes = randomBytes(length);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[bytes[i] % chars.length];
    }
    return password;
  }

  hashText(text: string, algorithm: string = 'sha256'): string {
    const allowedAlgorithms = ['md5', 'sha1', 'sha256'] as const;
    const normalizedAlgorithm = algorithm.toLowerCase();

    if (!allowedAlgorithms.includes(normalizedAlgorithm as (typeof allowedAlgorithms)[number])) {
      throw new Error(
        `Unsupported hash algorithm "${algorithm}". Allowed algorithms are: ${allowedAlgorithms.join(', ')}.`
      );
    }

    return createHash(normalizedAlgorithm).update(text).digest('hex');
  }
}
