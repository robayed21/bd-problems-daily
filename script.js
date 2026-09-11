const ENV = process.env;
const TOKEN = ENV['TELEGRAM' + '_TOKEN'];
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const problems = require('./problems.json').problems;

// ঢাকা টাইমজোন (UTC+6) অনুযায়ী আজকের তারিখ → YYYY-MM-DD
function todayDhaka() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
}

async function sendMessage(text) {
  const payload = { chat_id: CHAT_ID, text };
  let res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, parse_mode: 'Markdown' })
  });
  let data = await res.json();

  // Markdown পার্স এরর হলে প্লেইন টেক্সট হিসেবে আবার পাঠাই
  if (!data.ok && data.description && data.description.includes("can't parse entities")) {
    console.log('Markdown parse হয়নি, প্লেইন টেক্সটে পাঠানো হচ্ছে...');
    res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    data = await res.json();
  }

  console.log('Telegram:', data.ok ? '✅ Success' : `❌ Failed (${data.description || 'unknown error'})`);
  return data;
}

async function main() {
  const today = todayDhaka();
  const todayProblem = problems.find(p => p.date === today);

  if (!todayProblem) {
    console.log(`📅 ${today} — আজকের জন্য problems.json-এ কোনো এন্ট্রি নেই।`);
    return;
  }

  const message = `📰 *দৈনিক সমস্যা ও স্টার্টআপ সুযোগ*
📅 *তারিখ:* ${todayProblem.date}

🔹 *${todayProblem.title}*
${todayProblem.description}

📊 *সুযোগ:* ${todayProblem.impact_description}

━━━━━━━━━━━━━━━━━━━━━━━

💡 *${todayProblem.solution_title}:*
${todayProblem.solution_steps.map(s => '- ' + s).join('\n')}` + (todayProblem.startup_idea ? `

🚀 *স্টার্টআপ আইডিয়া:*
${todayProblem.startup_idea}` : '') + `

🔗 *রিসোর্স:* ${todayProblem.resources || 'N/A'}`;

  // টেস্ট করতে: DRY_RUN=1 node script.js (Telegram-এ পাঠাবে না, শুধু দেখাবে)
  if (process.env.DRY_RUN) {
    console.log('--- DRY RUN (পাঠানো হয়নি) ---\n');
    console.log(message);
    return;
  }

  if (!TOKEN || !CHAT_ID) {
    console.error('❌ TELEGRAM_TOKEN বা TELEGRAM_CHAT_ID সেট করা নেই! (GitHub Secrets চেক করুন)');
    process.exit(1);
  }

  console.log('মেসেজ পাঠানো হচ্ছে...');
  await sendMessage(message);
}

main().catch(err => { console.error('Error:', err); process.exit(1); });
