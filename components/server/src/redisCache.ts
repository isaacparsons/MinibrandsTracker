import type { RedisClientType } from "redis";
import { createClient } from "redis";

export default class RedisCache {
  client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL
    });

    this.client.connect().catch(console.error);
  }

  getClient() {
    return this.client;
  }

  async setArray<T>(key: string, arr: T[]) {
    await this.client.set(key, JSON.stringify(arr));
  }
  async getArray<T>(key: string): Promise<T[] | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }
}
