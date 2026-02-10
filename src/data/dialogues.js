// Berlin German Dialogue Scenarios
export const dialogues = [
  {
    id: 1,
    title: "Coffee Shop Order",
    difficulty: "A1",
    category: "daily",
    categoryIcon: "☕",
    quiz: [
      {
        question: "What does 'haste' mean in Berlin German?",
        options: ["hast du (do you have)", "haben sie (do they have)", "hat er (does he have)", "hatte ich (I had)"],
        correct: 0
      },
      {
        question: "How do you say 'what' in Berlin dialect?",
        options: ["was", "wat", "wer", "wo"],
        correct: 1
      },
      {
        question: "What is 'fuffzich'?",
        options: ["fifteen", "forty", "fifty", "five"],
        correct: 2
      }
    ],
    exchanges: [
      {
        id: 1,
        german: "Moin! Was kann ick dir bringen?",
        english: "Hey! What can I get you?",
        speaker: "barista",
        tips: ["'Moin' is casual Berlin greeting", "'ick' = 'ich' in Berlin dialect"]
      },
      {
        id: 2,
        german: "Einen Kaffee, bitte. Und haste och Milch?",
        english: "A coffee, please. And do you have milk too?",
        speaker: "learner",
        tips: ["'haste' = 'hast du'", "'och' = 'auch' (Berlin slang)"]
      },
      {
        id: 3,
        german: "Klar, haben wa. Normal oder Hafermilch?",
        english: "Sure, we have. Regular or oat milk?",
        speaker: "barista",
        tips: ["'wa' = 'wir' (we)", "Very casual Berlin style"]
      },
      {
        id: 4,
        german: "Hafermilch, bitte. Wat kostet det?",
        english: "Oat milk, please. What does that cost?",
        speaker: "learner",
        tips: ["'wat' = 'was'", "'det' = 'das' (Berlin pronunciation)"]
      },
      {
        id: 5,
        german: "Drei fuffzich. Machste bar oder Karte?",
        english: "Three fifty. You paying cash or card?",
        speaker: "barista",
        tips: ["'fuffzich' = 'fünfzig' (fifty)", "'Machste' = 'Machst du'"]
      }
    ]
  },
  {
    id: 2,
    title: "U-Bahn Small Talk",
    difficulty: "A2",
    category: "transport",
    categoryIcon: "🚇",
    quiz: [
      {
        question: "What does 'musste' mean in Berlin German?",
        options: ["musst du (you must)", "muss ich (I must)", "muss er (he must)", "müssen wir (we must)"],
        correct: 0
      },
      {
        question: "What is the Berlin dialect word for 'nein' (no)?",
        options: ["nee", "ne", "nö", "nich"],
        correct: 1
      },
      {
        question: "What does 'keen' mean in Berlin dialect?",
        options: ["klein (small)", "kein (no/none)", "können (can)", "kennen (to know)"],
        correct: 1
      },
      {
        question: "In the dialogue, where do you need to change trains?",
        options: ["Alexanderplatz", "Wedding", "After two stations", "At the end"],
        correct: 1
      }
    ],
    exchanges: [
      {
        id: 1,
        german: "Entschuldigung, fährt die U-Bahn nach Alexanderplatz?",
        english: "Excuse me, does this subway go to Alexanderplatz?",
        speaker: "learner",
        tips: ["Formal but common question", "Good for asking directions"]
      },
      {
        id: 2,
        german: "Jo, musste aber in Wedding umsteigen. Nach zwei Stationen.",
        english: "Yeah, but you have to change at Wedding. After two stops.",
        speaker: "stranger",
        tips: ["'Jo' = casual 'yes'", "'musste' = 'musst du'"]
      },
      {
        id: 3,
        german: "Ah, danke! Kommst du auch dahin?",
        english: "Ah, thanks! Are you going there too?",
        speaker: "learner",
        tips: ["Making friendly conversation", "Safe small talk"]
      },
      {
        id: 4,
        german: "Ne, ick steig vorher aus. Aber is keen Problem.",
        english: "Nah, I'm getting off before. But no problem.",
        speaker: "stranger",
        tips: ["'Ne' = 'Nein'", "'keen' = 'kein' (Berlin dialect)"]
      }
    ]
  },
  {
    id: 3,
    title: "Meeting at a Bar",
    difficulty: "A2",
    category: "social",
    categoryIcon: "🍻",
    quiz: [
      {
        question: "What is a 'Späti' in Berlin?",
        options: ["A late-night bus", "A late-night convenience store", "A late-night restaurant", "A bar that opens late"],
        correct: 1
      },
      {
        question: "What does 'Biste' mean?",
        options: ["Bist du (are you)", "Bis du (until you)", "Bitte (please)", "Beste (best)"],
        correct: 0
      },
      {
        question: "How do you say 'ein gutes' (a good) in Berlin dialect?",
        options: ["een jutes", "ein jut", "een gut", "ick jut"],
        correct: 0
      },
      {
        question: "What does 'Logo' mean in Berlin slang?",
        options: ["Maybe", "Of course", "I don't know", "Goodbye"],
        correct: 1
      }
    ],
    exchanges: [
      {
        id: 1,
        german: "Hey! Biste neu hier in Berlin?",
        english: "Hey! Are you new here in Berlin?",
        speaker: "stranger",
        tips: ["'Biste' = 'Bist du'", "Common ice breaker"]
      },
      {
        id: 2,
        german: "Ja, erst seit drei Wochen. Kennst du die Gegend gut?",
        english: "Yes, only been here three weeks. Do you know the area well?",
        speaker: "learner",
        tips: ["Standard German works fine here", "Asking for local tips"]
      },
      {
        id: 3,
        german: "Joa, wohne schon paar Jahre hier. Willste Tipps haben?",
        english: "Yeah, been living here a few years. Want some tips?",
        speaker: "stranger",
        tips: ["'Joa' = relaxed 'yes'", "'Willste' = 'Willst du'", "'paar' = ein paar (a few)"]
      },
      {
        id: 4,
        german: "Gerne! Kennst du een jutes Späti in der Nähe?",
        english: "Gladly! Do you know a good späti nearby?",
        speaker: "learner",
        tips: ["'een' = 'ein'", "'jut' = 'gut'", "Späti = late-night convenience store (Berlin culture!)"]
      },
      {
        id: 5,
        german: "Logo! Direkt um de Ecke. Komm, ick zeig dir det.",
        english: "Of course! Right around the corner. Come on, I'll show you.",
        speaker: "stranger",
        tips: ["'Logo' = 'of course' (slang)", "'de' = 'die'", "'det' = 'das'"]
      }
    ]
  },
  {
    id: 4,
    title: "Immigration Interview - Personal Info",
    difficulty: "B1",
    category: "immigration",
    categoryIcon: "📋",
    quiz: [
      {
        question: "What is the formal 'you' form in German that you must use in an immigration interview?",
        options: ["du", "Sie", "ihr", "dich"],
        correct: 1
      },
      {
        question: "What does 'Daueraufenthalt' mean?",
        options: ["Temporary residence", "Permanent residence", "Tourist visa", "Work permit"],
        correct: 1
      },
      {
        question: "What does 'Postleitzahl' mean?",
        options: ["Post office", "Postal code", "Mailing address", "Street number"],
        correct: 1
      },
      {
        question: "What information should you be ready to provide about where you live?",
        options: ["Only the city name", "Only the street name", "Full address including postal code", "Just the neighborhood"],
        correct: 2
      }
    ],
    exchanges: [
      {
        id: 1,
        german: "Guten Tag. Bitte setzen Sie sich. Wie heißen Sie?",
        english: "Good day. Please have a seat. What is your name?",
        speaker: "officer",
        tips: ["Formal interview setting", "Use 'Sie' form (formal you)"]
      },
      {
        id: 2,
        german: "Guten Tag. Ich heiße [Your Name]. Ich bin hier für mein Daueraufenthaltsinterview.",
        english: "Good day. My name is [Your Name]. I'm here for my permanent residence interview.",
        speaker: "learner",
        tips: ["'Daueraufenthalt' = permanent residence", "Stay formal and polite"]
      },
      {
        id: 3,
        german: "Wo wohnen Sie in Berlin?",
        english: "Where do you live in Berlin?",
        speaker: "officer",
        tips: ["Common question - practice your address"]
      },
      {
        id: 4,
        german: "Ich wohne in der Rüdickenstrate siebenundzwanzig in Berlin Hohenschönhausen, Postleitzahl dreizehn null fünfundfünfzig.",
        english: "I live at Rüdickenstraße 27 in Berlin Hohenschönhausen, postal code 13055.",
        speaker: "learner",
        tips: ["Practice saying your full address", "Numbers: 27 = siebenundzwanzig", "13055 = dreizehn null fünfundfünfzig"]
      },
      {
        id: 5,
        german: "Sind Sie verheiratet?",
        english: "Are you married?",
        speaker: "officer",
        tips: ["'verheiratet' = married", "Direct question about family status"]
      },
      {
        id: 6,
        german: "Ja, ich bin verheiratet. Meine Frau und ich haben einen Sohn.",
        english: "Yes, I'm married. My wife and I have a son.",
        speaker: "learner",
        tips: ["'Frau' = wife", "'Sohn' = son", "Keep it simple and clear"]
      }
    ]
  },
  {
    id: 5,
    title: "Immigration Interview - Work Situation",
    difficulty: "B1",
    category: "immigration",
    categoryIcon: "💼",
    quiz: [
      {
        question: "What does 'entlassen' mean?",
        options: ["Hired", "Promoted", "Laid off/made redundant", "Retired"],
        correct: 2
      },
      {
        question: "What is 'Arbeitslosengeld'?",
        options: ["Work permit", "Salary", "Unemployment benefits", "Tax refund"],
        correct: 2
      },
      {
        question: "What does 'Stelle' mean in this context?",
        options: ["Place", "Position/job", "Office", "Situation"],
        correct: 1
      },
      {
        question: "If asked about your work situation during unemployment, what should you emphasize?",
        options: ["That you're on vacation", "That you're actively looking for work", "That you don't need to work", "That you're thinking about it"],
        correct: 1
      }
    ],
    exchanges: [
      {
        id: 1,
        german: "Erzählen Sie mir über Ihre Arbeitssituation.",
        english: "Tell me about your work situation.",
        speaker: "officer",
        tips: ["'Arbeitssituation' = work situation", "Be honest and clear"]
      },
      {
        id: 2,
        german: "Ich habe bis August zweitausendfünfundzwanzig bei Orderbird gearbeitet. Dann wurde ich leider entlassen.",
        english: "I worked at Orderbird until August 2025. Unfortunately, I was laid off.",
        speaker: "learner",
        tips: ["'entlassen' = laid off/made redundant", "August 2025 = August zweitausendfünfundzwanzig"]
      },
      {
        id: 3,
        german: "Was machen Sie jetzt?",
        english: "What are you doing now?",
        speaker: "officer",
        tips: ["Direct question about current status"]
      },
      {
        id: 4,
        german: "Ich suche aktiv nach einer neuen Stelle. Zurzeit bekomme ich Arbeitslosengeld.",
        english: "I'm actively looking for a new position. Currently I'm receiving unemployment benefits.",
        speaker: "learner",
        tips: ["'Arbeitslosengeld' = unemployment benefit", "'Stelle' = position/job", "Be honest about unemployment"]
      },
      {
        id: 5,
        german: "Arbeitet Ihre Frau?",
        english: "Does your wife work?",
        speaker: "officer",
        tips: ["Question about household income"]
      },
      {
        id: 6,
        german: "Nein, meine Frau arbeitet momentan nicht. Sie kümmert sich um unseren Sohn.",
        english: "No, my wife is not currently working. She takes care of our son.",
        speaker: "learner",
        tips: ["'kümmert sich um' = takes care of", "'momentan' = currently"]
      }
    ]
  },
  {
    id: 6,
    title: "Immigration Interview - Integration",
    difficulty: "B1",
    category: "immigration",
    categoryIcon: "🏠",
    quiz: [
      {
        question: "What does 'Alltag' mean?",
        options: ["All day", "Daily life/everyday", "Always", "Old days"],
        correct: 1
      },
      {
        question: "What does 'beitragen' mean?",
        options: ["To leave", "To contribute", "To complain", "To belong"],
        correct: 1
      },
      {
        question: "What is 'Zuhause'?",
        options: ["House", "Home", "Apartment", "Family"],
        correct: 1
      },
      {
        question: "When asked why you want to stay in Germany, what should you emphasize?",
        options: ["Better weather than your home country", "Long-term commitment and integration", "Tourist attractions", "Temporary work opportunity"],
        correct: 1
      }
    ],
    exchanges: [
      {
        id: 1,
        german: "Wie lange leben Sie schon in Deutschland?",
        english: "How long have you been living in Germany?",
        speaker: "officer",
        tips: ["Common immigration question", "Be ready with your timeline"]
      },
      {
        id: 2,
        german: "Ich lebe seit [X Jahren] in Deutschland. Ich bin nach Berlin gezogen, um hier zu arbeiten und zu leben.",
        english: "I've been living in Germany for [X years]. I moved to Berlin to work and live here.",
        speaker: "learner",
        tips: ["Adjust the years to your situation", "'gezogen' = moved (past tense of 'ziehen')"]
      },
      {
        id: 3,
        german: "Sprechen Sie Deutsch im Alltag?",
        english: "Do you speak German in daily life?",
        speaker: "officer",
        tips: ["'Alltag' = daily life/everyday", "They want to know about integration"]
      },
      {
        id: 4,
        german: "Ja, ich versuche jeden Tag Deutsch zu sprechen. Beim Einkaufen, mit Nachbarn, und ich lerne weiter.",
        english: "Yes, I try to speak German every day. While shopping, with neighbors, and I continue learning.",
        speaker: "learner",
        tips: ["Show active integration", "'Nachbarn' = neighbors", "'weiter' = continue/further"]
      },
      {
        id: 5,
        german: "Warum möchten Sie in Deutschland bleiben?",
        english: "Why do you want to stay in Germany?",
        speaker: "officer",
        tips: ["Important question - show commitment"]
      },
      {
        id: 6,
        german: "Deutschland ist jetzt mein Zuhause. Meine Familie lebt hier, und ich möchte hier bleiben und weiter beitragen.",
        english: "Germany is now my home. My family lives here, and I want to stay and continue contributing.",
        speaker: "learner",
        tips: ["'Zuhause' = home", "'beitragen' = contribute", "Show long-term commitment"]
      }
    ]
  },
  {
    id: 7,
    title: "Numbers 1-50",
    difficulty: "A1",
    category: "basics",
    categoryIcon: "🔢",
    quiz: [
      {
        question: "How do you say '7' in German?",
        options: ["sechs", "sieben", "acht", "neun"],
        correct: 1
      },
      {
        question: "What is '23' in German?",
        options: ["dreiundzwanzig", "zwanzigunddrei", "dreizehn", "dreiunddreizig"],
        correct: 0
      },
      {
        question: "How do you say '30'?",
        options: ["dreißig", "dreizig", "dreizehn", "dreihundert"],
        correct: 0
      },
      {
        question: "What number is 'einundvierzig'?",
        options: ["14", "41", "40", "31"],
        correct: 1
      },
      {
        question: "How do you say '50' in Berlin dialect?",
        options: ["fünfzig", "fuffzich", "fünfzehn", "fuffzehn"],
        correct: 1
      }
    ],
    exchanges: [
      {
        id: 1,
        german: "1 - eins, 2 - zwei, 3 - drei, 4 - vier, 5 - fünf",
        english: "1 - one, 2 - two, 3 - three, 4 - four, 5 - five",
        speaker: "teacher",
        tips: ["Practice slowly", "Listen to the pronunciation"]
      },
      {
        id: 2,
        german: "6 - sechs, 7 - sieben, 8 - acht, 9 - neun, 10 - zehn",
        english: "6 - six, 7 - seven, 8 - eight, 9 - nine, 10 - ten",
        speaker: "teacher",
        tips: ["'sechs' sounds like 'zex'", "'acht' has a strong 'ch' sound"]
      },
      {
        id: 3,
        german: "11 - elf, 12 - zwölf, 13 - dreizehn, 14 - vierzehn, 15 - fünfzehn",
        english: "11 - eleven, 12 - twelve, 13 - thirteen, 14 - fourteen, 15 - fifteen",
        speaker: "teacher",
        tips: ["11 and 12 are irregular", "13-19 end with '-zehn'"]
      },
      {
        id: 4,
        german: "16 - sechzehn, 17 - siebzehn, 18 - achtzehn, 19 - neunzehn",
        english: "16 - sixteen, 17 - seventeen, 18 - eighteen, 19 - nineteen",
        speaker: "teacher",
        tips: ["Note: 'sechzehn' (not 'sechszehn')", "'siebzehn' (not 'siebenzehn')"]
      },
      {
        id: 5,
        german: "20 - zwanzig, 21 - einundzwanzig, 22 - zweiundzwanzig, 23 - dreiundzwanzig",
        english: "20 - twenty, 21 - twenty-one, 22 - twenty-two, 23 - twenty-three",
        speaker: "teacher",
        tips: ["Pattern: ones THEN tens", "'einundzwanzig' = one-and-twenty"]
      },
      {
        id: 6,
        german: "30 - dreißig, 31 - einunddreißig, 40 - vierzig, 41 - einundvierzig",
        english: "30 - thirty, 31 - thirty-one, 40 - forty, 41 - forty-one",
        speaker: "teacher",
        tips: ["'dreißig' uses 'ß'", "Same pattern: ones + und + tens"]
      },
      {
        id: 7,
        german: "50 - fünfzig (or 'fuffzich' in Berlin), 42 - zweiundvierzig, 33 - dreiunddreißig",
        english: "50 - fifty ('fuffzich' in Berlin slang), 42 - forty-two, 33 - thirty-three",
        speaker: "teacher",
        tips: ["Berlin: 'fuffzich' instead of 'fünfzig'", "Remember: smaller number first!"]
      }
    ]
  },
  {
    id: 8,
    title: "German Alphabet & Umlauts",
    difficulty: "A1",
    category: "basics",
    categoryIcon: "🔤",
    quiz: [
      {
        question: "How do you pronounce 'ä'?",
        options: ["Like 'ay' in 'day'", "Like 'eh' in 'bed'", "Like 'ah' in 'father'", "Like 'ee' in 'see'"],
        correct: 1
      },
      {
        question: "What sound does 'ü' make?",
        options: ["Like English 'u'", "Like 'oo' in 'boot'", "Like French 'u' (rounded lips, say 'ee')", "Like 'uh'"],
        correct: 2
      },
      {
        question: "How is 'ö' pronounced?",
        options: ["Like 'o' in 'go'", "Like 'er' in 'her'", "Like 'aw' in 'law'", "Like 'oh'"],
        correct: 1
      },
      {
        question: "What is 'ß' called?",
        options: ["Sharp S / Eszett", "Double S", "Beta", "Special B"],
        correct: 0
      },
      {
        question: "How do you say 'W' in German?",
        options: ["Like English 'W'", "Like English 'V'", "Like 'double-u'", "Silent"],
        correct: 1
      }
    ],
    exchanges: [
      {
        id: 1,
        german: "A - ah, B - beh, C - tseh, D - deh, E - eh, F - eff, G - geh",
        english: "A - ah, B - bay, C - tsay, D - day, E - eh, F - eff, G - gay",
        speaker: "teacher",
        tips: ["'C' is pronounced 'tseh'", "'G' is a hard 'geh' sound"]
      },
      {
        id: 2,
        german: "H - hah, I - ee, J - yot, K - kah, L - ell, M - emm, N - enn",
        english: "H - hah, I - ee, J - yot, K - kah, L - ell, M - emm, N - enn",
        speaker: "teacher",
        tips: ["'J' sounds like English 'Y'", "'I' is always 'ee' sound"]
      },
      {
        id: 3,
        german: "O - oh, P - peh, Q - kuh, R - err, S - ess, T - teh, U - ooh",
        english: "O - oh, P - pay, Q - koo, R - air, S - ess, T - tay, U - oo",
        speaker: "teacher",
        tips: ["'R' is guttural in German", "'U' is like 'oo' in boot"]
      },
      {
        id: 4,
        german: "V - fau, W - veh, X - iks, Y - üpsilon, Z - tset",
        english: "V - fow, W - vay, X - iks, Y - upsilon, Z - tset",
        speaker: "teacher",
        tips: ["'V' sounds like 'F'", "'W' sounds like English 'V'", "'Z' sounds like 'ts'"]
      },
      {
        id: 5,
        german: "Ä - like 'eh' in bed. Beispiel: Bär (bear), Käse (cheese)",
        english: "Ä - like 'eh' in bed. Example: Bär (bear), Käse (cheese)",
        speaker: "teacher",
        tips: ["Ä is an umlaut", "Pronounce with mouth more open than 'eh'"]
      },
      {
        id: 6,
        german: "Ö - like 'er' in her. Beispiel: schön (beautiful), Köln (Cologne)",
        english: "Ö - like 'er' in her. Example: schön (beautiful), Köln (Cologne)",
        speaker: "teacher",
        tips: ["Round your lips to say 'O', but say 'E'", "Common in German"]
      },
      {
        id: 7,
        german: "Ü - round lips and say 'ee'. Beispiel: über (over), Tür (door), München (Munich)",
        english: "Ü - round lips and say 'ee'. Example: über (over), Tür (door), München (Munich)",
        speaker: "teacher",
        tips: ["Like French 'u'", "Pucker lips like whistling, say 'ee'"]
      },
      {
        id: 8,
        german: "ß - Eszett (sharp S). Beispiel: Straße (street), groß (big), dreißig (30)",
        english: "ß - Eszett (sharp S). Example: Straße (street), groß (big), dreißig (30)",
        speaker: "teacher",
        tips: ["Sounds like 'ss'", "Only used in lowercase", "Never at start of word"]
      }
    ]
  }
];

// XP points awarded per action
export const XP_VALUES = {
  COMPLETE_EXCHANGE: 10,
  COMPLETE_DIALOGUE: 50,
  COMPLETE_SESSION: 100,
  DAILY_STREAK: 25
};

// Badge thresholds
export const BADGES = [
  { id: 1, name: "First Words", threshold: 0, icon: "🎯" },
  { id: 2, name: "Coffee Regular", threshold: 100, icon: "☕" },
  { id: 3, name: "U-Bahn Pro", threshold: 300, icon: "🚇" },
  { id: 4, name: "Interview Ready", threshold: 600, icon: "📋" },
  { id: 5, name: "Berliner", threshold: 900, icon: "🐻" },
  { id: 6, name: "Permanent Resident", threshold: 1500, icon: "🏠" }
];
