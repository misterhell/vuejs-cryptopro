<template>
  <div>
    <div>Дата сертификата {{ cryptoproDate }}</div>
    <div>frendly {{ frendly }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cryptoproDate: "2019-08-31T18:50:15.000Z",
      frendly: ""
    };
  },

  mounted() {
    this.frendly = this.getFrendlyDate(this.cryptoproDate);
  },

  methods: {
    getFrendlyDate(date) {
      date = new Date(date);

      return (
        [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(".") +
        " " +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(":")
      ).replace(/\b(\d)\b/g, "0$1");
    }
  }
};
</script>

<style>
</style>