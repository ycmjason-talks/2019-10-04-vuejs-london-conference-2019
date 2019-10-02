const context = new AudioContext();

const frequencyOscillatorMap: Map<number, OscillatorNode> = new Map();

export const startNote = (frequency: number): void => {
  if (frequencyOscillatorMap.has(frequency)) return;
  const oscillator = context.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.connect(context.destination);
  oscillator.start();
  frequencyOscillatorMap.set(frequency, oscillator);
};

export const stopNote = (frequency: number): void => {
  const oscillator = frequencyOscillatorMap.get(frequency);
  oscillator?.stop();
  frequencyOscillatorMap.delete(frequency);
};
