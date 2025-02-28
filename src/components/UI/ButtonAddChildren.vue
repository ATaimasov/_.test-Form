<template>
  <button class="btn btn-add">
    <AddIcon class="btn__icon" />
    <span>Добавить ребенка</span>
  </button>
</template>

<script setup>
import AddIcon from "@/components/icons/AddIcon.vue";
</script>

<style lang="scss" scoped>
.btn {
  &.btn-add {
    @include btn.buttonRoundFlat;
    align-items: center;
    display: flex;
    gap: 0.25rem; //4px;
  }
}
</style>
