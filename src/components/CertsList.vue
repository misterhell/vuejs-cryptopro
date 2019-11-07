<template>
  <div>
    <h1>Список: </h1>
    <ul>
      <li v-for="c in certs" :key="c.thumb">
          {{ c.label }}
      </li>
      <li v-if="certs && certs.length == 0">
        Список пуст
      </li>
    </ul>
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
      })
      .catch(e => alert(e));
  }
};
</script>

<style>
</style>