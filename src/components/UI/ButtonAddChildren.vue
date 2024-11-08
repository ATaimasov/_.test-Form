<template>
    <button class="btn btn-add"> 
        <AddIcon/>
        <span>Добавить ребенка</span>
    </button>
</template>

<script setup>
import AddIcon from '@/components/icons/AddIcon.vue'
</script>

<style lang="scss" scoped>
    .btn.btn-add {
        @include buttonDefault;
        border: 2px solid $color-primary;
        border-radius: 100px;
        display: flex;
        gap: 0.25rem; //4px;
        align-items: center;
    }
</style>