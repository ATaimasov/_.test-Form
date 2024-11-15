<template>
    <div class="form__input-wrapper">
        <input 
        type="text" 
        class="form__input" 
        placeholder=""
        :class="{ 'form__input--error': hasError }"
        @input="updateValue"
        :value="modelValue"
        >
        <span class="form__placeholder">{{ placeholder }}</span>
        <span v-if="hasError" class="form__error">{{ errorName }}</span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const { errorName, validateFunction, placeholder, maxLength, modelValue, hasError } = defineProps({
    modelValue: String,
    errorName: String,
    validateFunction: Function,
    placeholder: String,
    maxLength: {
        type: Number,
        default: Infinity
    },
    hasError: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'validate'])

const updateValue = (event) => {
  let value = event.target.value
  if(maxLength && value.length > maxLength) {
    value = value.slice(0, maxLength)
    event.target.value = value 
  }
  emit('update:modelValue', value)
  emit('validate', value)
}


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
    border: 1px solid v.$color-GrayL;
    border-radius: 4px;
    padding-left: 0.625rem;
    padding-top: 0.938rem;

    &:focus + .form__placeholder,
    &:focus-visible + .form__placeholder,
    &:not(:placeholder-shown) + .form__placeholder {
      top: 25%;
      font-size: 0.813rem;

      // & + .form__error {
      //   font-size: 0.9rem;
      //   top: 50%;
      // }
    }

    &--error {
      background: v.$color-error;
    }
  }

   &__placeholder {
    position: absolute;
    top: 50%;
    left: 0.625rem;
    transform: translateY(-50%);
    color: v.$color-GrayK;
    transition: v.$animation-default;
  }

  &__error {
    font-size: 0.813rem;
    position: absolute;
    top: 25%;
    right: 0.625rem;
    transform: translateY(-50%);
    color: v.$color-red;
    transition: v.$animation-default;
  }
}


</style>