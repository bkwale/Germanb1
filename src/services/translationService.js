// Translation service using the Anthropic Claude API directly from the browser.
// Requires REACT_APP_ANTHROPIC_API_KEY in .env.local.

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5-20251001';

const MEETING_CONTEXT = `The user is a Nigerian-British professional based in the UK with Estonian e-residency, attending a meeting in Germany. The meeting is likely with the Jobcenter or Arbeitsagentur and concerns employment, immigration status, a Bildungsgutschein (training voucher), and cyber security retraining. Use this context to disambiguate terms and pick the right register (formal Sie-form, professional, polite).`;

async function callClaude(systemPrompt, userPrompt) {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Missing REACT_APP_ANTHROPIC_API_KEY. Add it to .env.local and restart the dev server.');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Claude API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text?.trim() ?? '';
}

export async function translateGermanToEnglish(germanText) {
  if (!germanText?.trim()) return '';
  const system = `You are a real-time meeting interpreter. Translate German to natural, clear English.

STRICT OUTPUT RULES:
- Output ONLY the English translation. No preamble, no quotes, no notes, no meta-commentary.
- If the input is empty, garbled, repetitive nonsense, or untranslatable, output EXACTLY: [Unclear audio — try again]
- Do NOT explain yourself. Do NOT apologise. Do NOT describe the input.
- Maximum length: the length of a natural translation. No essays.

${MEETING_CONTEXT}`;
  return callClaude(system, germanText);
}

export async function translateEnglishToGerman(englishText) {
  if (!englishText?.trim()) return { german: '', phonetic: '' };
  const system = `You are a real-time meeting interpreter. Translate English to natural, polite, professional German (Sie-form unless context clearly calls for du). ${MEETING_CONTEXT}

Return your answer as strict JSON with two keys:
{
  "german": "the German translation",
  "phonetic": "an English-speaker-friendly phonetic guide using English syllables (e.g. 'ish HAH-buh ein-en TER-meen')"
}
Output ONLY the JSON object, nothing else.`;

  const raw = await callClaude(system, englishText);
  try {
    const cleaned = raw.replace(/^```json\s*|\s*```$/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return {
      german: parsed.german || '',
      phonetic: parsed.phonetic || '',
    };
  } catch {
    return { german: raw, phonetic: '' };
  }
}
