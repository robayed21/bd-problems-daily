# 📰 bd-problems-daily

প্রতিদিন বাংলাদেশের একটি বাস্তব সমস্যা ও তার সমাধানের রিপোর্ট Telegram-এ পাঠায় — GitHub Actions দিয়ে সম্পূর্ণ অটোমেটিক।

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
  "id": 2,
  "date": "2026-09-11",
  "title": "সমস্যার শিরোনাম",
  "description": "সমস্যার বিস্তারিত",
  "impact_level": "large",
  "impact_description": "কারা ও কতটা প্রভাবিত",
  "solution_title": "সমাধানের শিরোনাম",
  "solution_steps": ["ধাপ ১", "ধাপ ২"],
  "resources": "কোথায় আরও জানবেন"
}
```

> `date` অবশ্যই `YYYY-MM-DD` ফরম্যাটে দিতে হবে — স্ক্রিপ্ট ঢাকা টাইমজোন অনুযায়ী তারিখ মিলিয়ে পাঠায়।

## টেস্ট করা

- **লোকালে (মেসেজ না পাঠিয়ে):** `DRY_RUN=1 node script.js`
- **GitHub-এ:** Actions ট্যাব → Daily Problem Broadcast → **Run workflow**

## ফাইলসমূহ

| ফাইল | কাজ |
|---|---|
| `script.js` | আজকের সমস্যা খুঁজে Telegram-এ পাঠায় |
| `problems.json` | তারিখভিত্তিক সমস্যার ডেটা |
| `daily.yml` | GitHub Actions ওয়ার্কফ্লো (প্রতিদিন সকাল ৬টা, ঢাকা) |
