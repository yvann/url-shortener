import { URLShortener } from './service.js';

describe('URLShortener', () => {
  let service: URLShortener;

  beforeEach(() => {
    service = new URLShortener();
  });

  it.each([[undefined], [null], [''], ['an invalid url'], ['http//google.fr']])(
    'fails to shorten "%s"',
    (invalidUrl) => {
      expect(() => new URL(invalidUrl as any)).toThrowError();
    },
  );

  it.each([
    ['https://www.lunii.com/', '5HjPOA'],
    ['https://google.fr/', 'GhaYFS'],
  ])('shortens "%s" into "%s"', async (url, hash) => {
    await expect(service.shorten(new URL(url))).resolves.toBe(hash);

    const expanded = await service.expand(hash);
    expect(expanded?.href).toBe(url);
  });
});
