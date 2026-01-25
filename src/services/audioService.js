// Web Audio Service using MediaRecorder and Web Speech API

class AudioService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
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

  async cleanup() {
    try {
      this.stopSpeech();
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
