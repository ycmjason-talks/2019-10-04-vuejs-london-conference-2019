export const A4 = 440;

const SEMITONE_FACTOR = 2 ** (1 / 12);

export const SEMITONE = (i: number) => SEMITONE_FACTOR ** i;

export const OCTAVE = (i: number) => SEMITONE(12 * i);
