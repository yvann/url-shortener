import type { Analitycs, OriginalUrl, ShortenedUrlHash } from '../service.js';

export interface Storageinterface {
  set(
    shortenedUrlHash: ShortenedUrlHash,
    originalUrl: OriginalUrl,
  ): Promise<void>;

  get(shortenedUrlHash: ShortenedUrlHash): Promise<OriginalUrl | undefined>;

  getAnalytics(): Promise<Analitycs[]>;
}
