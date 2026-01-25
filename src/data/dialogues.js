// Berlin German Dialogue Scenarios
export const dialogues = [
  {
    id: 1,
    title: "Coffee Shop Order",
    difficulty: "A1",
    category: "daily",
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
