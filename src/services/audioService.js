// Web Audio Service using MediaRecorder and Web Speech API

class AudioService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
    this.recognition = null;
  }

  // Text-to-Speech for German audio
  async speakGerman(text, speed = 1.0) {
    try {
      // Stop any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = speed;
      utterance.pitch = 1.0;

      // Try to find a German voice
      const voices = window.speechSynthesis.getVoices();
      const germanVoice = voices.find(voice => voice.lang.startsWith('de'));
      if (germanVoice) {
        utterance.voice = germanVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech error:', error);
      throw error;
    }
  }

  async stopSpeech() {
    window.speechSynthesis.cancel();
  }

  // Recording functionality
  async startRecording() {
    try {
      // Request microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      return true;
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw new Error('Microphone access denied. Please allow microphone access in your browser settings.');
    }
  }

  async stopRecording() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No active recording'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Stop all tracks
        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
        }

        resolve(audioUrl);
      };

      this.mediaRecorder.stop();
    });
  }

  async playRecording(uri) {
    try {
      const audio = new Audio(uri);
      await audio.play();
      return audio;
    } catch (error) {
      console.error('Failed to play recording:', error);
      throw error;
    }
  }

  // Speech Recognition for pronunciation checking
  async recognizeSpeech(expectedText) {
    return new Promise((resolve, reject) => {
      // Check if browser supports speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        reject(new Error('Speech recognition not supported in this browser. Try Chrome.'));
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'de-DE';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      let finalTranscript = '';

      this.recognition.onresult = (event) => {
        const result = event.results[0][0];
        finalTranscript = result.transcript;

        // Calculate similarity
        const similarity = this.calculateSimilarity(expectedText, finalTranscript);

        resolve({
          recognized: finalTranscript,
          expected: expectedText,
          similarity: similarity,
          confidence: result.confidence
        });
      };

      this.recognition.onerror = (event) => {
        reject(new Error(`Recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        if (!finalTranscript) {
          reject(new Error('No speech detected. Please try again.'));
        }
      };

      this.recognition.start();
    });
  }

  // Simple text similarity calculation (Levenshtein-based)
  calculateSimilarity(str1, str2) {
    // Normalize strings (lowercase, remove punctuation)
    const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const s1 = normalize(str1);
    const s2 = normalize(str2);

    // Calculate Levenshtein distance
    const distance = this.levenshteinDistance(s1, s2);
    const maxLen = Math.max(s1.length, s2.length);

    // Convert to percentage similarity
    const similarity = maxLen === 0 ? 100 : ((maxLen - distance) / maxLen) * 100;
    return Math.round(similarity);
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
  }

  async cleanup() {
    try {
      this.stopSpeech();
      this.stopRecognition();
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

const audioServiceInstance = new AudioService();
export default audioServiceInstance;
