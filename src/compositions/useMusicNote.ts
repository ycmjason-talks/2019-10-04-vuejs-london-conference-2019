import { Ref, watch } from '@vue/composition-api';
import { startNote, stopNote } from '/audio';

export const useMusicNote = (frequency: number, isPlaying: Ref<boolean>): void => {
  watch(isPlaying, isPlaying => {
    if (isPlaying) {
      startNote(frequency);
    } else {
      stopNote(frequency);
    }
  });
};
