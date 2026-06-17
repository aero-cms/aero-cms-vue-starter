# AeroCMS Vue / Nuxt Starter

Nuxt 4 starter website for Aero CMS using `@aero-cms/vue-sdk`. Public content API, component content schema sync, admin preview ve SEO (sitemap/robots) için başlangıç noktası.

> **İlk kez mi?** Tüm kurulum adımları:
> [aero-cms-setup — Başlangıç Rehberi](https://github.com/aero-cms/aero-cms-setup/blob/main/docs/GETTING_STARTED.md)
> · [Framework seçimi](https://github.com/aero-cms/aero-cms-setup/blob/main/docs/FRAMEWORK_GUIDE.md)

## Gereksinimler

- Node.js 20+
- Çalışan AeroCMS API (`aero-cms-api`)
- İlk kurulum için admin panel setup sihirbazı tamamlanmış olmalı

## Hızlı Başlangıç

```bash
cp .env.example .env
npm install
npm run dev
```

| Servis | Varsayılan URL |
|--------|----------------|
| Frontend | `http://localhost:3000` |
| API (yerel) | `http://localhost:5047` |
| Admin panel | `http://localhost:5173/admin/` |

`aero-cms-setup` kullanıyorsanız `FRONTEND_STACK=nuxt` ile `make setup` sonrası `.env` otomatik oluşturulur.

## Ortam Değişkenleri

```bash
NUXT_PUBLIC_CMS_API_URL=http://localhost:5047
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_ADMIN_ORIGIN=http://localhost:5173
# CMS_TOKEN=  # npm run cms:sync için admin JWT
```

Değerlerin sonuna `/api/v1/content` **eklemeyin**; SDK yolu kendisi ekler.

## Sayfalar

| Rota | Açıklama |
|------|----------|
| `/` | Ana sayfa (component content) |
| `/haberler`, `/etkinlikler`, `/dokumanlar` | İçerik listeleri |
| `/iletisim` | CMS formu (`iletisim` slug) |
| `/arama` | Site içi arama |
| `/[slug]` | CMS sayfaları |
| `/sitemap.xml` | Dinamik sitemap |
| `/robots.txt` | Arama motoru kuralları |

## Schema Sync

Admin panelden alınan JWT ile component schema'ları API'ye gönderilir:

```bash
CMS_TOKEN=your_admin_jwt npm run cms:sync
```

Schema tanımları: `app/lib/schemas.ts`

## Preview

URL'de `?cms-preview=true` ile admin panelden canlı önizleme çalışır. Yalnızca `NUXT_PUBLIC_ADMIN_ORIGIN` adresinden gelen mesajlar kabul edilir.

## Çoklu Dil (i18n)

Header'daki dil seçici `aero_lang` çerezini ayarlar. CMS içerik istekleri seçilen `lang` parametresi ile yapılır.

## Build ve Docker

```bash
npm run build
npm run typecheck
```

```bash
docker build -t aero-cms-vue-starter .
docker run --rm -p 3000:3000 \
  -e NUXT_PUBLIC_CMS_API_URL=http://host.docker.internal:5047 \
  -e NUXT_PUBLIC_ADMIN_ORIGIN=http://host.docker.internal:5173 \
  aero-cms-vue-starter
```

Docker Compose stack'inde API genelde `http://api:8090`, admin `http://admin:80` olarak ayarlanır.

## İlgili Repolar

- [aero-cms-api](https://github.com/aero-cms/aero-cms-api)
- [aero-cms-admin](https://github.com/aero-cms/aero-cms-admin)
- [@aero-cms/vue-sdk](https://www.npmjs.com/package/@aero-cms/vue-sdk)
- [aero-cms-setup](https://github.com/aero-cms/aero-cms-setup)
