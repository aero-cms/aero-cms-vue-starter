# AeroCMS Vue / Nuxt Starter

Nuxt 4 starter website for Aero CMS using `@aero-cms/vue-sdk`.

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev
```

| Service | Default URL |
|---------|-------------|
| Frontend | `http://localhost:3000` |
| API | `http://localhost:5047` |
| Admin | `http://localhost:5173/admin/` |

## Pages

- `/` — Home
- `/haberler`, `/etkinlikler`, `/dokumanlar`
- `/iletisim` — CMS form (`iletisim` slug)
- `/arama` — Site search
- `/[slug]` — Dynamic CMS pages

## Related

- [aero-cms-api](https://github.com/aero-cms/aero-cms-api)
- [@aero-cms/vue-sdk](https://www.npmjs.com/package/@aero-cms/vue-sdk)
