<template>
  <div>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path">{{ route.name }}</router-link>
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
