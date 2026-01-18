# 🌐 WebSablon - Çok Amaçlı Web İskeleti

Feature-Based Modüler Monolith mimarisi ile farklı sektörlere (araç galerisi, gayrimenkul, spor salonu, klinik vb.) kolayca uyarlanabilen, çoklu tema ve çoklu dil destekli modern bir Next.js web iskeleti.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Ready-green?style=flat-square&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## ✨ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🎨 **5 Hazır Tema** | Default, Automotive, RealEstate, Gym, Clinic |
| 🌍 **Çoklu Dil (i18n)** | Türkçe & İngilizce (kolay genişletilebilir) |
| 📱 **Mobile-First** | Tüm bileşenler önce mobil için tasarlandı |
| 🌓 **Dark/Light Mod** | Sistem tercihi + manuel seçim |
| 🧩 **Modüler Yapı** | Feature modülleri ile kolay ekleme/çıkarma |
| 💾 **Supabase** | Veritabanı entegrasyonu hazır |
| ☁️ **BackBlaze B2** | Dosya/medya depolama desteği |
| 🚀 **Vercel Ready** | Tek tıkla deploy |

---

## 🏗️ Mimari: Feature-Based Modüler Monolith

Bu iskelet, **Feature-Based Modüler Monolith** mimarisini kullanır. Bu yaklaşım:

- ✅ Her özellik (feature) kendi klasöründe izole edilir
- ✅ Yeni modül eklemek mevcut yapıyı bozmaz
- ✅ Modüller arası bağımlılık minimumda tutulur
- ✅ İleride microservices'e geçiş kolaylaşır

```
src/
├── app/                    # Next.js App Router (Sayfalar)
├── core/                   # Çekirdek: Tema + i18n
├── shared/                 # Paylaşılan: UI, Layout, Hooks
├── data/                   # Veri: Supabase, BackBlaze
└── features/               # Modüller: Vehicles, RealEstate, ...
```

---

## 📁 Detaylı Klasör Yapısı

```
webSablon/
├── src/
│   ├── app/
│   │   └── [locale]/                 # Dil bazlı routing (/tr/, /en/)
│   │       ├── layout.tsx            # Root layout + providers
│   │       ├── page.tsx              # Ana sayfa
│   │       ├── vehicles/page.tsx     # Araç galerisi
│   │       ├── real-estate/page.tsx  # Gayrimenkul
│   │       ├── about/page.tsx        # Hakkımızda
│   │       ├── contact/page.tsx      # İletişim
│   │       └── services/page.tsx     # Hizmetler
│   │
│   ├── core/
│   │   ├── theme/
│   │   │   ├── themes.ts             # 5 tema tanımı
│   │   │   ├── ThemeProvider.tsx     # Tema context
│   │   │   └── theme.css             # CSS değişkenleri
│   │   └── i18n/
│   │       ├── config.ts             # Dil yapılandırması
│   │       ├── request.ts            # next-intl request
│   │       └── locales/
│   │           ├── tr.json           # Türkçe
│   │           └── en.json           # İngilizce
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/                   # Button, Card, Input, Modal
│   │   │   └── layout/               # Header, Footer, ThemeSwitcher
│   │   ├── hooks/                    # useMediaQuery, useIsMobile
│   │   └── utils/                    # Yardımcı fonksiyonlar
│   │
│   ├── data/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Supabase istemci
│   │   │   └── types.ts              # Veritabanı tipleri
│   │   └── storage/
│   │       └── backblaze.ts          # B2 dosya servisi
│   │
│   └── features/
│       ├── vehicles/                 # 🚗 Araç Galerisi Modülü
│       │   ├── components/
│       │   ├── services/
│       │   ├── types/
│       │   └── locales/              # Modüle özel çeviriler
│       │
│       └── realEstate/               # 🏠 Gayrimenkul Modülü
│           ├── components/
│           ├── services/
│           ├── types/
│           └── locales/
│
├── .env.example                      # Ortam değişkenleri şablonu
├── next.config.ts                    # Next.js yapılandırması
├── package.json
└── tsconfig.json
```

---

## 🚀 Kurulum

### 1. Repoyu Klonla

```bash
git clone https://github.com/mehmet-karataslar/WebSablon.git
cd WebSablon
```

### 2. Bağımlılıkları Yükle

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarla

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# BackBlaze B2
B2_APPLICATION_KEY_ID=your_b2_key_id
B2_APPLICATION_KEY=your_b2_key
B2_BUCKET_NAME=your_bucket_name
B2_BUCKET_ENDPOINT=your_bucket_endpoint

# Site
NEXT_PUBLIC_SITE_NAME=Sitenizin Adı
NEXT_PUBLIC_DEFAULT_THEME=default
NEXT_PUBLIC_DEFAULT_LOCALE=tr
```

### 4. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcıda: [http://localhost:3000](http://localhost:3000)

---

## 🧩 Yeni Modül Ekleme

Feature-Based yapı sayesinde yeni modül eklemek çok kolay:

### 1. Modül Klasörü Oluştur

```bash
mkdir -p src/features/gym/{components,services,types,locales}
```

### 2. Tipleri Tanımla

```typescript
// src/features/gym/types/membership.ts
export interface Membership {
  id: string;
  name: string;
  price: number;
  duration: number;
}
```

### 3. Servisi Oluştur

```typescript
// src/features/gym/services/membershipService.ts
import { supabase } from '@/data/supabase';

export const membershipService = {
  getAll: async () => {
    const { data } = await supabase.from('memberships').select('*');
    return data;
  },
};
```

### 4. Çevirileri Ekle

```json
// src/features/gym/locales/tr.json
{
  "title": "Spor Salonu",
  "memberships": "Üyelikler"
}
```

### 5. Sayfayı Oluştur

```tsx
// src/app/[locale]/gym/page.tsx
export default function GymPage() {
  return <div>Spor Salonu Sayfası</div>;
}
```

---

## 🎨 Tema Özelleştirme

### Yeni Tema Ekleme

`src/core/theme/themes.ts` dosyasına yeni tema ekleyin:

```typescript
export const themes = {
  // ...mevcut temalar
  
  restaurant: {
    key: 'restaurant',
    name: 'Restoran',
    description: 'Yeme-içme sektörü için sıcak tema',
    colors: {
      light: {
        primary: '#dc2626',
        secondary: '#f97316',
        // ...
      },
      dark: {
        // ...
      },
    },
  },
};
```

### Tema Kullanımı

```tsx
import { useTheme } from '@/core/theme';

function MyComponent() {
  const { theme, setTheme, colorMode, setColorMode } = useTheme();
  
  return (
    <button onClick={() => setTheme('restaurant')}>
      Restoran Teması
    </button>
  );
}
```

---

## 🌍 Dil Ekleme

### 1. Yeni Dil Dosyası

```json
// src/core/i18n/locales/de.json
{
  "common": {
    "siteName": "Web-Vorlage",
    "loading": "Laden..."
  }
}
```

### 2. Konfigürasyonu Güncelle

```typescript
// src/core/i18n/config.ts
export const locales = ['tr', 'en', 'de'] as const;

export const localeNames = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
};
```

---

## 📱 Bileşenler

### Button

```tsx
import { Button } from '@/shared/components/ui';

<Button variant="primary" size="lg" fullWidth>
  Kaydet
</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`  
**Sizes:** `sm`, `md`, `lg`

### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter, CardImage } from '@/shared/components/ui';

<Card variant="elevated" clickable>
  <CardImage src="/image.jpg" aspectRatio="video" />
  <CardBody>İçerik</CardBody>
  <CardFooter>
    <Button>Detay</Button>
  </CardFooter>
</Card>
```

### Modal

```tsx
import { Modal, ModalFooter } from '@/shared/components/ui';

<Modal isOpen={isOpen} onClose={onClose} title="Başlık">
  <p>Modal içeriği</p>
  <ModalFooter>
    <Button onClick={onClose}>Kapat</Button>
  </ModalFooter>
</Modal>
```

---

## 🔧 Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm start` | Production sunucusu |
| `npm run lint` | ESLint kontrolü |

---

## 🚀 Deploy (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mehmet-karataslar/WebSablon)

Veya manuel:

```bash
npm i -g vercel
vercel
```

---

## 📄 Lisans

MIT License - Bu projeyi özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz.

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

<div align="center">
  <strong>WebSablon</strong> ile hızlı ve modüler web projeleri geliştirin! 🚀
</div>
