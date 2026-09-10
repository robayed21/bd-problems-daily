const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const problems = require('./problems.json').problems;

async function sendMessage(text) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  });
  const data = await res.json();
  console.log('Telegram:', data.ok ? '✅ Success' : '❌ Failed');
  return data;
}

async function main() {
  const today = new Date().toISOString().split('T')[0];
  const todayProblem = problems.find(p => p.date === today);
  if (!todayProblem) { console.log('কোনো সমস্যা নেই'); return; }

  const message = `📰 *বাংলাদেশের দৈনিক সমস্যা রিপোর্ট*
📅 *তারিখ:* ${todayProblem.date}

🔹 *${todayProblem.title}*
${todayProblem.description}

📊 *প্রভাব:* ${todayProblem.impact_description}

━━━━━━━━━━━━━━━━━━━━━━━

💡 *${todayProblem.solution_title}:*
${todayProblem.solution_steps.map(s => '- ' + s).join('\n')}

🔗 *রিসোর্স:* ${todayProblem.resources || 'N/A'}`;

  console.log('মেসেজ পাঠানো হচ্ছে...');
  await sendMessage(message);
}

main().catch(err => { console.error('Error:', err); process.exit(1);});
