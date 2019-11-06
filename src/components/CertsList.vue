<template>
  <div>

    <div v-for="c in certs" :key="c.thumb">
        {{ certs }}
    </div>

  </div>
</template>

<script>
import { getCertsList } from "../lib/cryptopro-cades-api-lib";

export default {
  data() {
    return {
      certs: null
    };
  },

  mounted() {
    getCertsList()
      .then(certs => {
        this.certs = certs;
        console.log(certs);
      })
      .catch(e => alert(e));
  }
};
</script>

<style>
</style>