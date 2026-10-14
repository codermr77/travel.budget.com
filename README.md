# Safar byudjeti (Bilet 020)

Guruh safari xarajatini hisoblaydigan veb-sayt. Telefonda ham, kompyuterda ham ishlaydi va telefonga ilova kabi o'rnatiladi.

## Fayllar

```
safar-byudjeti/
├── index.html              Sahifa tuzilishi (bo'limlar, forma, pastki menyu)
├── css/style.css           Dizayn, ranglar, telefon va kompyuter uchun moslashuv
├── js/
│   ├── core.js             Umumiy funksiyalar, ikonlar, ma'lumotni saqlash
│   ├── pages.js            Bo'limlar orasida o'tish, pastki menyu
│   ├── account.js          Hisob (profil)
│   ├── calc.js             Kalkulyator, muddat, diagramma
│   ├── map.js              Xarita, marshrut, navigator, tezlik, yoqilg'i
│   ├── expenses.js         Xarajatlarim va statistika
│   ├── pack.js             Yuk ro'yxati
│   ├── history.js          Hisoblashlar tarixi
│   ├── ai.js               AI maslahatchi
│   ├── theme.js            Tungi/kunduzgi rejim va telefon rejimi
│   └── main.js             Ishga tushirish va oflayn rejim
├── manifest.webmanifest    Telefonga o'rnatish sozlamalari
├── sw.js                   Oflayn ishlash uchun kesh
└── icons/                  Ilova ikonlari
```

## Kompyuterda ishga tushirish

Papkada terminalni oching va ishga tushiring:

```
python -m http.server 8000
```

Brauzerda `http://localhost:8000` ni oching. `index.html` ni ikki marta bosib ham ochish mumkin, lekin oflayn rejim va o'rnatish ishlamaydi.

## Yangilangan fayllar ko'rinmasa

Brauzer eski nusxani eslab qolgan bo'lishi mumkin. Chrome'da F12, «Application», «Service Workers» bo'limida «Unregister» ni bosing, so'ng Ctrl+Shift+R bilan sahifani yangilang. Yoki «Storage» bo'limida «Clear site data» ni bosing.

## Telefonga o'rnatish

1. Papkani hosting'ga yuklang (GitHub Pages, Netlify yoki Cloudflare Pages). Hosting HTTPS beradi.
2. Havolani telefonda oching.
3. Android (Chrome): menyu, «Ilovani o'rnatish». iPhone (Safari): «Ulashish», «Bosh ekranga qo'shish».

Joylashuv (navigator va GPS tezligi) telefonda faqat HTTPS orqali ishlaydi.

## Ko'rinish rejimlari

- **Tungi / kunduzgi rejim:** tepadagi quyosh yoki oy tugmasi (yoki Hisob bo'limidagi «Ko'rinish») bilan almashtiriladi. Birinchi ochilganda qurilma sozlamasiga mos tanlanadi, keyin tanlovingiz eslab qolinadi.
- **Telefon rejimi:** kompyuterda tepadagi telefon tugmasi sayt ko'rinishini telefon o'lchamiga (tor ustun, pastki menyu) o'tkazadi. Telefonda sayt har doim shu ko'rinishda.

## Qanday ishlaydi

- Hisoblash faqat «Hisoblash» tugmasi bosilganda bajariladi.
- Ma'lumotlar (xarajatlar, tarix, safarlar, yuk ro'yxati, hisob) shu qurilma brauzerida saqlanadi (`localStorage`).
- Xarita ichida 30 ta shahar tayyor. Fon rasmi yuklanmaydi, shuning uchun u oflayn ham ishlaydi. Aniq yo'l uchun «Google Maps'da ochish» tugmasi bor.
- Vaqt va masofa taxminiy: to'g'ri chiziq masofasi yo'l koeffitsiyentiga ko'paytirilib, o'rtacha tezlikka bo'linadi.

## Muhim cheklov

AI maslahatchi, tizimga kirishga bog'langan hisob va ro'yxatda yo'q joylarning koordinatasini aniqlash Claude ichida (claude.ai'da joylashtirilgan sahifada) ishlaydi. Bu fayllarni o'zingizning hostingingizga qo'ysangiz, bu uchta narsa ishlamaydi:
- AI bo'limi «AI bu yerda mavjud emas» deb yozadi;
- hisob faqat shu brauzerda saqlanadi;
- xaritada faqat ro'yxatdagi shaharlar qidiriladi (`js/map.js` ichidagi `CITIES` ro'yxatiga yangi shahar qo'shsangiz bo'ladi).

Haqiqiy AI kerak bo'lsa, `js/ai.js` dagi `ask` funksiyasini o'zingizning serveringiz (AI API) bilan ulash kerak.
