import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { translateGermanToEnglish, translateEnglishToGerman } from '../services/translationService';
import audioService from '../services/audioService';
import { GLOSSARY_CATEGORIES } from '../data/glossary';
import './MeetingPage.css';

const TABS = [
  { id: 'listen', label: 'Listen', icon: '🎧' },
  { id: 'speak', label: 'Speak', icon: '🗣️' },
  { id: 'glossary', label: 'Glossary', icon: '📖' },
];

export default function MeetingPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('listen');

  // ===== Listen panel state =====
  const [isListening, setIsListening] = useState(false);
  const [interimGerman, setInterimGerman] = useState('');
  const [history, setHistory] = useState([]); // [{ id, german, english, ts }]
  const [translating, setTranslating] = useState(false);
  const recognitionRef = useRef(null);

  // ===== Speak panel state =====
  const [englishInput, setEnglishInput] = useState('');
  const [germanOutput, setGermanOutput] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [translatingOut, setTranslatingOut] = useState(false);
  const [outError, setOutError] = useState('');

  // ===== Glossary state =====
  const [glossaryCat, setGlossaryCat] = useState(GLOSSARY_CATEGORIES[0].id);
  const [glossarySearch, setGlossarySearch] = useState('');

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  // ===== Listen logic =====
  // Collapse repeated words/phrases (Android Chrome re-emits finals as it grows them,
  // so we can end up with "Beamter Beamter vielen Beamter vielen Dank...").
  const dedupeText = (text) => {
    if (!text) return '';
    let cleaned = text.trim().replace(/\s+/g, ' ');
    let prev = '';
    let iters = 0;
    while (cleaned !== prev && iters < 20) {
      prev = cleaned;
      iters += 1;
      // For phrase lengths 5 down to 1, collapse "X X" → "X" (case-insensitive).
      for (let n = 5; n >= 1; n--) {
        const pattern = new RegExp(`\\b((?:\\w+\\b\\s*){${n}})\\1+`, 'gi');
        cleaned = cleaned.replace(pattern, '$1');
      }
      cleaned = cleaned.replace(/\s+/g, ' ').trim();
    }
    return cleaned;
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'de-DE';
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    // Track finals by their result index so we OVERWRITE on re-emit instead of appending.
    const finalsByIndex = {};

    const buildText = (includeInterim) => {
      const finals = Object.keys(finalsByIndex)
        .map(Number)
        .sort((a, b) => a - b)
        .map((k) => finalsByIndex[k])
        .join(' ');
      return dedupeText(includeInterim ? (finals + ' ' + includeInterim) : finals);
    };

    rec.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalsByIndex[i] = transcript;
        } else {
          interim += transcript + ' ';
        }
      }
      setInterimGerman(buildText(interim));
    };

    rec.onerror = (event) => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.error('Recognition error:', event.error);
      }
    };

    rec.onend = async () => {
      setIsListening(false);
      const finalText = buildText('').trim();
      if (finalText) {
        const id = Date.now();
        setHistory((h) => [{ id, german: finalText, english: '…', ts: id }, ...h].slice(0, 20));
        setTranslating(true);
        try {
          const english = await translateGermanToEnglish(finalText);
          setHistory((h) => h.map((item) => (item.id === id ? { ...item, english } : item)));
        } catch (err) {
          setHistory((h) => h.map((item) => (item.id === id ? { ...item, english: `[Error: ${err.message}]` } : item)));
        } finally {
          setTranslating(false);
        }
      }
      setInterimGerman('');
    };

    recognitionRef.current = rec;
    setIsListening(true);
    setInterimGerman('');
    rec.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
  };

  // ===== Speak logic =====
  const handleTranslateOut = async () => {
    if (!englishInput.trim()) return;
    setTranslatingOut(true);
    setOutError('');
    setGermanOutput('');
    setPhonetic('');
    try {
      const { german, phonetic: ph } = await translateEnglishToGerman(englishInput);
      setGermanOutput(german);
      setPhonetic(ph);
    } catch (err) {
      setOutError(err.message);
    } finally {
      setTranslatingOut(false);
    }
  };

  const speakOutput = (speed = 1.0) => {
    if (!germanOutput) return;
    audioService.speakGerman(germanOutput, speed);
  };

  // ===== Glossary filter =====
  const activeCategory = GLOSSARY_CATEGORIES.find((c) => c.id === glossaryCat);
  const filteredTerms = activeCategory.terms.filter((t) => {
    if (!glossarySearch.trim()) return true;
    const q = glossarySearch.toLowerCase();
    return t.de.toLowerCase().includes(q) || t.en.toLowerCase().includes(q);
  });

  return (
    <div className="meeting-container">
      <header className="meeting-header">
        <button className="back-btn" onClick={() => navigate('/')} aria-label="Back">←</button>
        <h1 className="meeting-title">Meeting Mode</h1>
        <div className="meeting-spacer" />
      </header>

      <nav className="meeting-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            className={`meeting-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="meeting-tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <main className="meeting-main">
        {tab === 'listen' && (
          <section className="panel">
            <div className="panel-header">
              <h2>They said (German → English)</h2>
              <p className="panel-hint">Tap the mic, listen for a sentence or two, then tap stop. Translation appears below.</p>
            </div>

            <button
              className={`mic-btn ${isListening ? 'recording' : ''}`}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? '⏹ Stop listening' : '🎤 Start listening'}
            </button>

            {interimGerman && (
              <div className="live-transcript">
                <div className="live-label">Live</div>
                <div className="live-text">{interimGerman}</div>
              </div>
            )}

            {translating && <div className="translating-note">Translating…</div>}

            <div className="history">
              {history.length === 0 && !isListening && (
                <div className="empty-state">No conversation yet. Hit the mic to start.</div>
              )}
              {history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-de">{item.german}</div>
                  <div className="history-en">→ {item.english}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === 'speak' && (
          <section className="panel">
            <div className="panel-header">
              <h2>I want to say (English → German)</h2>
              <p className="panel-hint">Type in English. Get the German translation, phonetic guide, and audio.</p>
            </div>

            <textarea
              className="english-input"
              placeholder="Type what you want to say in English…"
              value={englishInput}
              onChange={(e) => setEnglishInput(e.target.value)}
              rows={4}
            />

            <button
              className="translate-btn"
              onClick={handleTranslateOut}
              disabled={!englishInput.trim() || translatingOut}
            >
              {translatingOut ? 'Translating…' : 'Translate to German'}
            </button>

            {outError && <div className="error-box">{outError}</div>}

            {germanOutput && (
              <div className="german-output">
                <div className="german-label">Say this:</div>
                <div className="german-text">{germanOutput}</div>
                {phonetic && (
                  <div className="phonetic-line">
                    <span className="phonetic-label">Sounds like:</span> {phonetic}
                  </div>
                )}
                <div className="speak-controls">
                  <button onClick={() => speakOutput(1.0)} className="speak-btn">🔊 Play</button>
                  <button onClick={() => speakOutput(0.7)} className="speak-btn slow">🐢 Slow</button>
                  <button onClick={() => audioService.stopSpeech()} className="speak-btn stop">⏹ Stop</button>
                </div>
              </div>
            )}
          </section>
        )}

        {tab === 'glossary' && (
          <section className="panel">
            <div className="panel-header">
              <h2>Glossary</h2>
              <p className="panel-hint">Pre-loaded for Jobcenter, immigration, Bildungsgutschein, and cyber security.</p>
            </div>

            <input
              type="search"
              className="glossary-search"
              placeholder="Search German or English…"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
            />

            <div className="glossary-cat-tabs">
              {GLOSSARY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`glossary-cat-tab ${glossaryCat === cat.id ? 'active' : ''}`}
                  onClick={() => setGlossaryCat(cat.id)}
                >
                  <span>{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>

            <div className="glossary-list">
              {filteredTerms.length === 0 && <div className="empty-state">No matches.</div>}
              {filteredTerms.map((term, idx) => (
                <div key={idx} className="glossary-item">
                  <div className="glossary-de">
                    <span>{term.de}</span>
                    <button
                      className="glossary-speak"
                      onClick={() => audioService.speakGerman(term.de, 0.9)}
                      aria-label={`Pronounce ${term.de}`}
                    >🔊</button>
                  </div>
                  <div className="glossary-en">{term.en}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
