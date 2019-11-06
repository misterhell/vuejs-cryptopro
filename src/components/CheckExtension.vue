<template>
  <div>Проверка плагина</div>
</template>

<script>
import { checkPlugin } from "../lib/cryptopro-cades-api-lib";

export default {
  mounted() {
    // создает window.cadesplugin
    checkPlugin()
      .then(() => alert("Плагин загружен"))
      .catch(e => {
        alert(e);
      });
  }
};
</script>

<style>
</style>