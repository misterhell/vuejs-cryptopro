<template>
  <div>
    <h1>getCert, possibleInfo, friendly user info, friendly subject info</h1>
    <select v-model="selected">
      <option v-for="c in certs" :key="c.thumbprint" :value="c">{{ c.label }}</option>
    </select>
    <button @click="getCertFromStorage" :disabled="!selected">get</button>

    <div>
      <strong>possibleInfo:</strong>
      <ul>{{ possibleInfo || '-'}}</ul>
    </div>

    <div class="containre-of-halfs">
      <div class="half">
        <strong>getOwnerInfo:</strong>
        <small>
          <pre>{{ this.getOwnerInfo || '-' }}</pre>
        </small>
      </div>

      <div class="half">
        <strong>getIssuerInfo:</strong>
        <small>
          <pre>{{ this.getIssuerInfo || '-' }}</pre>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { getCertsList, getCert } from "../lib/cryptopro-cades-api-lib";

export default {
  data() {
    return {
      certs: [],
      selected: null,
      possibleInfo: null,
      getOwnerInfo: null,
      getIssuerInfo: null
    };
  },

  mounted() {
    getCertsList()
      .then(certs => {
        this.certs = certs;
      })
      .catch(e => console.error(e));
  },

  methods: {
    getCertFromStorage() {
      getCert(this.selected.thumbprint)
        .then(async cert => {
          this.getIssuerInfo = await cert.getIssuerInfo();

          this.getOwnerInfo = await cert.getOwnerInfo();

          this.possibleInfo = cert.subjectName;
        })
        .catch(e => console.error(e));
    }
  }
};
</script>

<style>
.containre-of-halfs {
    display: flex
}
.half {
  width: 50%;

}
</style>