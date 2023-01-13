import type { Analitycs, OriginalUrl, ShortenedUrlHash } from '../service.js';
import type { Storageinterface } from './interface.js';

type Entry = {
  url: OriginalUrl;
  nbClicks: number;
};

export class LocalStorage implements Storageinterface {
  readonly #data = new Map<ShortenedUrlHash, Entry>();

  public async get(
    shortenedUrlHash: ShortenedUrlHash,
  ): Promise<OriginalUrl | undefined> {
    const entry = this.#data.get(shortenedUrlHash);
    if (!entry) {
      return;
    }

    entry.nbClicks++;

    return entry.url;
  }

  public async set(
    shortenedUrlHash: ShortenedUrlHash,
    originalUrl: OriginalUrl,
  ): Promise<void> {
    if (!this.#data.has(shortenedUrlHash)) {
      this.#data.set(shortenedUrlHash, { url: originalUrl, nbClicks: 0 });
    }
  }

  public async getAnalytics(): Promise<Analitycs[]> {
    return Array.from(this.#data, ([shortenedUrlHash, { url, nbClicks }]) => ({
      originalUrl: url,
      shortUrl: shortenedUrlHash,
      nbClicks,
    }));
  }
}
