# RMOS Dashboard

NextJs app router ve typescript ile dashboard uygulaması.

## 🚀 Özellikler

- **Authentication**: https://service.rmosweb.com/security/createToken endpointinden gelen token'i guvenli bir sekilde cookies ve localStorage'a kaydeder ve her requestte Authorization header ile gonderir.
- **Forecast Dashboard**: https://frontapi.rmosweb.com/api/Procedure/StpRmforKlasik_2 endpointi ile gelen verileri data table ve chart ile gösterme.
- **Blacklist Management**:https://frontapi.rmosweb.com/api/Kara/Getir_Kod endpointi ile gelen verileri data table ile gosterme ve table uzerinde acilan dialoglar ile crud islemleri.
- **Real-time Data**: TanStack Query ile otomatik veri senkronizasyonu ve caching.
- **Responsive Design**: Tüm cihazlarda mükemmel kullanıcı deneyimi.
- **Server-side Prefetching**: Hızlı sayfa yüklemeleri , tanstack query ile server side prefetching ardindan client side hydration.

## 🛠️ Teknoloji Stack

### Zorunlu Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **UI Kütüphanesi**: Shadcn/ui + Tailwind CSS

### Ek Teknolojiler

- **State Management**: TanStack Query (React Query) - Ilk basta react query kullanmadan sadece nextjs ve server componentlar ile yaptim fakat bir yerden sonra loading, error, ve refresh ve invalidate islemleri okunabilirligi cok dusurdu ve bu yuzden react query kullanmaya basladim.
- **Form Management**: React Hook Form + Zod - Form validationlar ve genel schema validationlar icin zod kullanildi.
- **HTTP Client**: Fetch API + Custom wrapper - Axios gibi bir http client kullanmadim cunku fetch api yeterliydi ve custom wrapper ile istedigimiz gibi yapabildik.
- **Authentication**: JWT + httpOnly cookies
- **Charts**: Recharts - Shadcn ile birlikte Recharts ile interaktif grafikler yapildi.
- **Icons**: Lucide React

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard layout
│   │   ├── forecast/      # Forecast sayfası
│   │   └── blacklist/     # Blacklist sayfası
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints - Bunlar prefetching yapabilmem icin server side cookie okumak gerektigi icin koydum.
│   └── page.tsx           # Login sayfası
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── forecast/         # Forecast components
│   └── blacklist/        # Blacklist components
├── lib/                  # Utility fonksiyonları
│   ├── queries/          # TanStack Query hooks
│   ├── types/            # TypeScript types
│   └── validations/      # Zod şemaları
└── providers/            # React query providers
```

## 🏗️ Mimari Kararlar

### 1. Kod Kalitesi ve Organizasyon

**Yaklaşım**: Feature-based klasör yapısı ve katmanlı mimari

- **Separation of Concerns**: Her feature kendi klasöründe (forecast, blacklist)
- **Custom Hooks**: İş mantığını UI'dan ayıran custom hooks - Bu projede custom hooks kullanmadim /queries klasorundeki react query hooklari yeterli oldu.
- **Type Safety**: Tüm API yanıtları için TypeScript tipleri
- **Consistent Naming**: Tutarlı dosya ve fonksiyon isimlendirmesi

### 2. State Yönetimi

**Seçim**: TanStack Query (React Query)

**Gerekçeler**:

- **Server State**: API verilerini otomatik yönetir
- **Caching**: Akıllı caching ve senkronizasyon
- **Background Updates**: Arka planda veri güncellemeleri
- **Optimistic Updates**: Anında UI güncellemeleri
- **Error Handling**: Merkezi hata yönetimi

### 3. API Entegrasyonu

**Yaklaşım**: Hybrid authentication model

- **Server-side**: httpOnly cookies (güvenlik)
- **Client-side**: localStorage (performans)
- **Error Handling**: Retry logic ve kullanıcı dostu mesajlar

### 4. Form Yönetimi

**Seçim**: React Hook Form + Zod

**Avantajlar**:

- **Performance**: Uncontrolled components ile minimal re-render
- **Validation**: Runtime type checking
- **Developer Experience**: TypeScript entegrasyonu
- **Error Handling**: Otomatik hata mesajları

### 5. Performans Optimizasyonu

**Uygulanan Teknikler**:

- **Server-side Prefetching**: İlk sayfa yüklemesinde veri hazır
- **HydrationBoundary**: Client-side hydration
- **Stale-while-revalidate**: Eski veri göster, arka planda güncelle
- **Optimistic Updates**: Anında UI güncellemeleri

### 6. Hata Yönetimi

**Strateji**: Katmanlı hata yönetimi

- **API Level**: HTTP status kodları ve retry logic - Tanstack query ile retry logic yapildi.
- **Query Level**: TanStack Query error boundaries
- **Component Level**: Try-catch ve nextjs error boundaryleri kullandim
- **User Level**: Kullanıcı dostu hata mesajları

### 7. Responsive Tasarım

**Yaklaşım**: Mobile-first design

- **Tailwind CSS**: Utility-first CSS framework
- **Breakpoints**: sm, md, lg, xl breakpoint'leri
- **Flexible Layouts**: CSS Grid ve Flexbox

## 🔐 Authentication Flow

1. **Login**: Kullanıcı girişi → JWT token alınır
2. **Cookie Storage**: Token httpOnly cookie'de saklanır
3. **Client Storage**: Token localStorage'da da saklanır
4. **API Requests**: Authorization header ile gönderilir
5. **Logout**: Hem cookie hem localStorage temizlenir

## 📊 API Entegrasyonu

### Endpoints

- **Authentication**: `https://service.rmosweb.com/security/createToken`
- **Forecast**: `https://frontapi.rmosweb.com/api/Procedure/StpRmforKlasik_2`
- **Blacklist**: `https://frontapi.rmosweb.com/api/Kara/Getir_Kod`
- **Blacklist CRUD**: `https://frontapi.rmosweb.com/api/Kara/Ekle`

### Demo Credentials

```
Email: yunus@test.com
Password: yunus
```

## 🚀 Kurulum ve Çalıştırma

```bash
# Dependencies yükle
pnpm install

# Development server'ı başlat
pnpm dev

```

## 🎯 Opsiyonel Geliştirmeler

### Uygulanan Geliştirmeler

1. **Server-side Prefetching**: Sayfa yüklenmeden önce veri hazır
2. **Optimistic Updates**: Anında UI güncellemeleri
3. **Error Boundaries**: Graceful error handling
4. **Loading States**: Skeleton loaders ve spinners
5. **Form Validation**: Real-time validation feedback
6. **Responsive Charts**: Recharts ile interaktif grafikler
7. **TypeScript**: %100 type safety
