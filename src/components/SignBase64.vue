<template>
  <div>
    <h1>SignBase64w</h1>
    <div class="mr">
      cert
      <select v-model="selectedCert">
        <option disabled selected value>--- выберите сертификат ---</option>
        <option v-for="c in certs" :key="c.thumbprint" :value="c">{{ c.label }}</option>
      </select>
    </div>

    <div class="mr">
      data to sign:
      <input type="text" v-model="dataToSign" />
    </div>

    <div class="mr">
      in base64:
      <input type="text" :value="dataToSignBase64" readonly />
    </div>

    <div class="mr">
      sign:
      <br />
      <textarea rows="10" cols="40" v-model="sign"></textarea>
    </div>

    <div class="mr">
      <button @click="signData" :disabled="!selectedCert && dataToSign.length">sign</button>
    </div>
  </div>
</template>

<script>
import { getCertsList, signBase64 } from "../lib/cryptopro-cades-api-lib";

export default {
  data() {
    return {
      certs: null,
      selectedCert: "",
      dataToSign: "",
      signed: "",
      sign: ""
    };
  },

  mounted() {
    getCertsList()
      .then(certs => {
        console.log(certs);
        this.certs = certs;
      })
      .catch(e => console.error(e));
  },

  computed: {
    dataToSignBase64() {
      return btoa(this.dataToSign);
    }
  },

  methods: {
    signData() {
      signBase64(this.selectedCert.thumbprint, this.dataToSignBase64)
        .then(sign => {
          console.log("sign: ", sign);
          this.sign = sign;
        })
        .catch(e => console.error(e));
    }
  }
};
</script>

<style>
.mr {
  margin: 10px;
}
</style>