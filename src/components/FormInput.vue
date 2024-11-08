<template>
    <div class="form__input-wrapper">
        <input 
        type="text" 
        class="form__input" 
        placeholder=""
        v-model="localValue"
        :class="{ 'form__input--error': error }"
        >
        <span class="form__placeholder">{{ placeholder }}</span>
        <span v-if="error" class="form__error">{{ error }}</span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const { value, error, validateFunction, placeholder } = defineProps({
    value: String,
    error: String,
    validateFunction: Function,
    placeholder: String
})



const localValue = ref(value)


</script>

<style lang="scss" scoped>

.form {
    &__input-wrapper {
    position: relative;
    width: 100%;
  }

  &__input {
    height: 3.5rem;
    width: 100%;
    border: 1px solid $color-GrayL;
    border-radius: $button-border-radius;
    padding-left: 0.625rem;
    padding-top: 0.938rem;

    &:focus + .form__placeholder,
    &:focus-visible + .form__placeholder,
    &:not(:placeholder-shown) + .form__placeholder {
      top: 25%;
      font-size: 0.813rem;
    }

    &--error {
      background: $color-error;
    }
  }

   &__placeholder {
    position: absolute;
    top: 50%;
    left: 0.625rem;
    transform: translateY(-50%);
    color: $color-GrayK;
    transition: $animation-default;
  }

  &__error {
    font-size: 1rem;
    position: absolute;
    top: 50%;
    right: 0.625rem;
    transform: translateY(-50%);
    color: $color-red;
    transition: $animation-default;
  }
}


</style>