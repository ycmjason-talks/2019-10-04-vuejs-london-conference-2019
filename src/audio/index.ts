import { createElectricPianoOscillator } from '/audio/createElectricPianoOscillator';

const frequencyOscillatorMap: Map<number, OscillatorNode> = new Map();

export const startNote = (frequency: number): void => {
  if (frequencyOscillatorMap.has(frequency)) return;
  const oscillator = createElectricPianoOscillator(frequency);
  oscillator.start();
  frequencyOscillatorMap.set(frequency, oscillator);
};

export const stopNote = (frequency: number): void => {
  const oscillator = frequencyOscillatorMap.get(frequency);
  oscillator?.stop();
  frequencyOscillatorMap.delete(frequency);
};
