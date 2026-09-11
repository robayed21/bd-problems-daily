# 📰 bd-problems-daily

প্রতিদিন এমন একটি বাস্তব সমস্যার কথা Telegram-এ পাঠায় — **যেটা একজন মানুষ নিজেই সমাধান করতে পারে এবং যেখান থেকে একটা স্টার্টআপ/ব্যবসা শুরু করা যায়** — GitHub Actions দিয়ে সম্পূর্ণ অটোমেটিক।

## কীভাবে কাজ করে

- `problems.json` ফাইলে তারিখ অনুযায়ী প্রতিদিনের সমস্যা থাকে
- প্রতিদিন সকাল ৬টায় (ঢাকা সময়) GitHub Actions অটোমেটিক `script.js` চালায়
- স্ক্রিপ্ট আজকের তারিখের এন্ট্রি খুঁজে সুন্দর ফরম্যাটে Telegram-এ পাঠায়

## সেটআপ (একবার করলেই হবে)

1. Telegram-এ [@BotFather](https://t.me/BotFather)-এর কাছ থেকে বট বানিয়ে **TOKEN** নিন
2. নিজের **চ্যাট আইডি** বের করুন — [@userinfobot](https://t.me/userinfobot)-কে মেসেজ দিলেই পাবেন
3. আপনার নতুন বটে একবার `/start` দিন (নাহলে বট আপনাকে মেসেজ পাঠাতে পারবে না)
4. GitHub-এ এই রিপোর **Settings → Secrets and variables → Actions**-এ দুটি secret যোগ করুন:
   - `TELEGRAM_TOKEN` — BotFather-এর দেওয়া টোকেন
   - `TELEGRAM_CHAT_ID` — আপনার চ্যাট আইডি

## নতুন সমস্যা যোগ করা

`problems.json`-এ এই ফরম্যাটে এন্ট্রি যোগ করুন:

```json
{
  "id": 9,
  "date": "2026-09-18",
  "title": "সমস্যার শিরোনাম",
  "description": "সমস্যার বিস্তারিত",
  "impact_level": "high",
  "impact_description": "মার্কেট/সুযোগ কত বড়",
  "solution_title": "একজন মানুষ যেভাবে সমাধান করতে পারে",
  "solution_steps": ["ধাপ ১", "ধাপ ২"],
  "startup_idea": "এক লাইনে স্টার্টআপ আইডিয়া + প্রথম কাস্টমার কোথায় পাবে",
  "resources": "কোথায় আরও জানবেন"
}
```

> `startup_idea` ফিল্ড দিলে মেসেজে 🚀 স্টার্টআপ আইডিয়া সেকশন যোগ হবে।

> `date` অবশ্যই `YYYY-MM-DD` ফরম্যাটে দিতে হবে — স্ক্রিপ্ট ঢাকা টাইমজোন অনুযায়ী তারিখ মিলিয়ে পাঠায়।

## টেস্ট করা

- **লোকালে (মেসেজ না পাঠিয়ে):** `DRY_RUN=1 node script.js`
- **GitHub-এ:** Actions ট্যাব → Daily Problem Broadcast → **Run workflow**

## ফাইলসমূহ

| ফাইল | কাজ |
|---|---|
| `script.js` | আজকের সমস্যা খুঁজে Telegram-এ পাঠায় |
| `problems.json` | তারিখভিত্তিক সমস্যার ডেটা |
| `.github/workflows/daily.yml` | GitHub Actions ওয়ার্কফ্লো (প্রতিদিন সকাল ৬টা, ঢাকা) |
