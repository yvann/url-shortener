import { createHash } from 'node:crypto';
import type { URL } from 'node:url';
import type { Storageinterface } from './storage/interface.js';
import { LocalStorage } from './storage/local.js';

export type OriginalUrl = URL;

export type ShortenedUrlHash = string;

export type Analitycs = {
  originalUrl: OriginalUrl;
  shortUrl: ShortenedUrlHash;
  nbClicks: number;
};

export interface URLShortenerConfig {
  readonly storage?: Storageinterface;
}

export class URLShortener {
  readonly #storage: Storageinterface;

  public constructor(config?: URLShortenerConfig) {
    this.#storage = config?.storage ?? new LocalStorage();
  }

  public async shorten(originalUrl: OriginalUrl): Promise<ShortenedUrlHash> {
    const shortenedUrlHash = createHash('sha1')
      .update(originalUrl.href)
      .digest('base64')
      .substring(0, 6);

    await this.#storage.set(shortenedUrlHash, originalUrl);

    return shortenedUrlHash;
  }

  public async expand(
    shortenedUrlHash: ShortenedUrlHash,
  ): Promise<OriginalUrl | undefined> {
    return this.#storage.get(shortenedUrlHash);
  }

  public async getAnalytics(): Promise<Analitycs[]> {
    return this.#storage.getAnalytics();
  }
}
