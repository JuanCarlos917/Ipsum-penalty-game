import { useCallback, useRef } from 'react';

export function useGameSounds() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playGoalSound = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Create a celebratory fanfare sound
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0, now + i * 0.1);
      gainNode.gain.linearRampToValueAtTime(0.3, now + i * 0.1 + 0.05);
      gainNode.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.2);
      gainNode.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.5);

      oscillator.start(now + i * 0.1);
      oscillator.stop(now + i * 0.1 + 0.5);
    });

    // Add crowd cheer effect (white noise burst)
    const bufferSize = ctx.sampleRate * 0.8;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1000;
    noiseFilter.Q.value = 0.5;

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    noiseGain.gain.linearRampToValueAtTime(0.1, now + 0.4);
    noiseGain.gain.linearRampToValueAtTime(0, now + 0.8);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.8);
  }, [getAudioContext]);

  const playSavedSound = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Create a descending "aww" boo sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, now);
    oscillator.frequency.linearRampToValueAtTime(150, now + 0.6);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.3);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.6);

    oscillator.start(now);
    oscillator.stop(now + 0.6);

    // Add crowd murmur (filtered noise)
    const bufferSize = ctx.sampleRate * 0.7;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 500;

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.4);
    noiseGain.gain.linearRampToValueAtTime(0, now + 0.7);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.7);
  }, [getAudioContext]);

  return { playGoalSound, playSavedSound };
}
