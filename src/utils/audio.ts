/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Synthesize pleasant kitchen order bell/chime using Web Audio API
export function playKitchenOrderChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Play two resonant harmonious notes (e.g., E5 then B5 or G5 then C6)
    const playTone = (freq: number, startTime: number, duration: number, gainValue: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Smooth attack and decay
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    // Chime note 1: 784 Hz (G5)
    playTone(783.99, now, 0.45, 0.28);
    // Chime note 2: 1046.5 Hz (C6) with warm harmonic resonance
    playTone(1046.50, now + 0.12, 0.75, 0.32);
    // Subtle sub-harmonic for warmth
    playTone(523.25, now + 0.12, 0.65, 0.14);

    // Clean up
    setTimeout(() => {
      if (ctx.state !== 'closed') {
        ctx.close().catch(() => {});
      }
    }, 1200);
  } catch (err) {
    // Graceful fallback if audio is blocked by browser policy
    console.warn('Audio playback notice:', err);
  }
}
