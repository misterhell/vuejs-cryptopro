<template>
  <div>
    <button @click="check">Проверить</button>
    check
  </div>
</template>

<script>

import { checkPlugin } from "../lib/cryptopro-cades-api-lib";

export default {
  data() {
    return {
      // err:
    };
  },

  methods: {
    check() {
        checkPlugin()
          .then(() => alert('работает'))
          .catch(e => alert(e))
    }
  }
};
</script>

<style>
</style>