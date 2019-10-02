import { Ref, ref, onMounted, onBeforeUnmount } from '@vue/composition-api';

export const useKeyDown = (key: string): Ref<boolean> => {
  const isKeyDown = ref(false);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === key) {
      isKeyDown.value = true;
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === key) {
      isKeyDown.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
  });

  return isKeyDown;
};
