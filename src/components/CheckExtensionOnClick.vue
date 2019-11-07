<template>
  <div>
    <h1>Проверка плагина</h1>
    <button @click="check">Проверить</button>
    <div>{{ loaded ? 'загружен' : 'не загружен'}}</div>
  </div>
</template>

<script>
import { checkPlugin } from "../lib/cryptopro-cades-api-lib";

export default {
  data() {
    return {
      loaded: false
    };
  },

  methods: {
    check() {
      checkPlugin()
        .then(() => {
          this.loaded = true
          alert("работает")
        })
        .catch(e => alert(e));
    }
  }
};
</script>

<style>
</style>