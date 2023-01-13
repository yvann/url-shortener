import express from 'express';
import { URLShortener } from './service.js';

const urlShortener = new URLShortener();

export const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/analytics', async (_req, res) => {
  const analytics = await urlShortener.getAnalytics();

  res.json(
    analytics.map(({ originalUrl, shortUrl, nbClicks }) => ({
      originalUrl: originalUrl.href,
      shortUrl,
      nbClicks,
    })),
  );
});

router.post('/', async (req, res) => {
  const rawOriginalUrl = req.body.originalUrl;
  if (!rawOriginalUrl) {
    return res
      .status(400)
      .json({ error: 'Expects the "originalUrl" to be provided' });
  }

  let originalUrl: URL;
  try {
    originalUrl = new URL(rawOriginalUrl);
  } catch (error) {
    return res.status(400).json({
      error: `Expects a valid URL, got: ${rawOriginalUrl}`,
    });
  }

  const shortUrl = await urlShortener.shorten(originalUrl);

  return res.json({ originalUrl: originalUrl.href, shortUrl });
});

router.get('/:hash', async (req, res) => {
  const originalUrl = await urlShortener.expand(req.params.hash);

  return originalUrl
    ? res.redirect(originalUrl.href)
    : res.status(404).json({ error: 'URL not found' });
});
