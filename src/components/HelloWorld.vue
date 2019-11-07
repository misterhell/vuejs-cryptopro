<template>
  <div>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <router-link v-if="route.name != 'err'" :to="route.path">{{ route.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>


import routes from "../routes";

export default {
  name: "HelloWorld",

  computed: {
    routes() {
      return routes || [];
    }
  },
};
</script>
