<script setup lang="ts">
import CopyrightLogo from "@/components/icons/CopyrightLogo.vue";
</script>

<template>
  <div class="copyrights">
    <a
      href="https://github.com/ATaimasov"
      target="_blank"
      class="copyrights__link"
    >
      <CopyrightLogo class="logo copyrights__logo" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.copyrights {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyrights__link {
  color: black;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
}

.copyrights__logo {
  scale: 0.4;

  @media screen and (min-width: 750px) {
    scale: 0.8;
  }
  @media screen and (min-width: 1100px) {
    scale: 1;
  }
}
</style>
