type CacheData = {
  data: any;
  timestamp: number;
};

class Cache {
  private static instance: Cache;
  private cache: Map<string, CacheData>;
  private readonly DEFAULT_TTL = 60 * 1000; // 1 minute in milliseconds

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cacheInstance = Cache.getInstance();
export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes