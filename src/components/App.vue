<template>
  <div id="app">
    <h1>Keyboard-Keyboard</h1>
    <main>
      <PianoKeyboard
        class="higherPiano"
        startKey="F"
        :numberOfKeys="higherKeys.length"
        :labels="higherKeys"
        :isActives="higherIsActives"
      ></PianoKeyboard>
      <PianoKeyboard
        class="lowerPiano"
        startKey="F"
        :numberOfKeys="lowerKeys.length"
        :labels="lowerKeys"
      ></PianoKeyboard>
    </main>
    <Footer class="footer"></Footer>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';
import Footer from '/components/Footer.vue';
import PianoKeyboard from '/components/PianoKeyboard.vue';
import { SEMITONE, A4, OCTAVE } from '/audio/frequencies';
import zip from 'lodash.zip'; // zip([1,2,3], [4, 5]) => [[1, 4], [2, 5], [3, undefined]]
import { useKeyDown } from '../compositions/useKeyDown';
import { useMusicNote } from '../compositions/useMusicNote';

const F2 = A4 * SEMITONE(-4) * OCTAVE(-1);

const higherKeys = 'q2w3e4rt6y7ui9o0p-[]'.split('');
const higherFrequencies = higherKeys.map((_, i) => F2 * SEMITONE(i));

const lowerKeys = '`azsxdcvgbhnmk,l.;/'.split('');
const lowerFrequencies = lowerKeys.map((_, i) => F2 * SEMITONE(i) * OCTAVE(-1));

export default createComponent({
  components: { Footer, PianoKeyboard },
  setup() {
    const higherIsKeyDowns = higherKeys.map(key => useKeyDown(key));
    for (const [frequency, isKeyDown] of zip(higherFrequencies, higherIsKeyDowns)) {
      if (!frequency || !isKeyDown) continue;
      useMusicNote(frequency, isKeyDown);
    }

    return {
      higherKeys,
      higherIsActives: computed(() => higherIsKeyDowns.map(({ value }) => value)),
      lowerKeys,
    };
  },
});
</script>

<style>
@import 'normalize.css';
html {
  font-family: 'Indie Flower', cursive;
  font-size: 28px;
}
</style>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 3rem;
}

main {
  text-align: center;
}

.higherPiano {
  margin-bottom: 1rem;
}

.footer {
  margin-top: 3rem;
}
</style>
