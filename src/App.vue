<script setup>
import Form from '@/views/Form.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <div>
    <TheHeader/>
      <Teleport to="#main">
          <router-view></router-view>
      </Teleport>
    <TheFooter/>
  </div>
</template>

<style scoped>

.main-container {
  display: grid;
}

</style>
