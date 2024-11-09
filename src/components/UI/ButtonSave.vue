<template>
    <button type="submit" class="btn btn-save">Сохранить</button>
</template>

<script setup>

</script>

<style lang="scss" scoped>

    .btn-save {
        @include btn.buttonRoundPrimaryFlat; 
        background-color: v.$color-primary;
        color: v.$color-primary-white;
        width: 7.375rem; //118px;
        height: 2.75rem; //44px;
    }
</style>
