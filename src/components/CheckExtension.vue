<template>
  <div>
    <h1>Проверка плагина</h1>
    {{ loaded ? 'загружен' : 'не загружен'}}
  </div>
</template>

<script>
import { checkPlugin } from "../lib/cryptopro-cades-api-lib";

export default {
  data () {
    return {
      loaded: false
    }
  },

  mounted() {
    // создает window.cadesplugin
    checkPlugin()
      .then(() => {
        this.loaded = true
        alert("Плагин загружен")
      })
      .catch(e => {
        alert(e);
      });
  }
};
</script>

<style>
</style>