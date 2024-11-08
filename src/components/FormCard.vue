<template>
  <form class="form" @submit.prevent="saveInfo">
    <div class="form__container">
      <h2 class="form__title">Персональные данные</h2>
      <FormInput
      :value="localPerson.name"
      :error="localPerson.errors.nameError"
      @input="validateName"
      :placeholder="PLACEHOLDER.name"
      />
      <!-- <div class="form__input-wrapper">
        <input 
          type="text" 
          class="form__input" 
          placeholder=""
          v-model="localPerson.name"
          @input="validateName"
          :class="{ 'form__input--error': localPerson.errors.nameError }"
        >
        <span class="form__placeholder">{{ PLACEHOLDER.name }}</span>
        <span v-if="localPerson.errors.nameError" class="form__error">{{ localPerson.errors.nameError }}</span>
      </div> -->
      <FormInput
      :value="localPerson.age"
      :error="localPerson.errors.age"
      @input="validateAge"
      :placeholder="PLACEHOLDER.age"
      />
      <!-- <div class="form__input-wrapper">
        <input 
          type="text" 
          class="form__input"
          placeholder=""
          v-model="localPerson.age"
          @input="validateAge"
          :class="{ 'form__input--error': localPerson.errors.ageError }"
        >
        <span class="form__placeholder">{{ PLACEHOLDER.age }}</span>
        <span v-if="localPerson.errors.ageError" class="form__error">{{ localPerson.errors.ageError }}</span>
      </div> -->
    </div>
    <div class="form__container">
      <div class="form__title">
        <h2 class="form__title-header">Дети (макс. 5)</h2>
        <ButtonAddChildren 
          class="form__title-btn"
          @click="addChild" 
          :disabled="localChildren.length >= 5"
        />
      </div>
      <div 
        v-for="(child, index) in localChildren"
        :key="child.id"
        class="form__children-list"
      >
        <div class="form__input-wrapper">
          <input 
            type="text" 
            placeholder="" 
            class="form__input"
            v-model="child.name"
            @input="validateName"
          >
          <span class="form__placeholder">{{ PLACEHOLDER.name }}</span>
        </div>
        <div class="form__input-wrapper">
          <input 
            type="text" 
            placeholder="" 
            class="form__input"
            @input="validateChildAge(index)"
            v-model="child.age"
            :class="{ 'form__input--error': child.ageError }"
          >    
          <span class="form__placeholder">{{ PLACEHOLDER.age }}</span>
          <span v-if="child.errors.ageError" class="form__error">{{ child.errors.ageError }}</span>
        </div>
        <ButtonRemove class="children-btn__remove" @click="removeChild(index)" />
      </div>
    </div>
    <ButtonSave 
      @click="saveInfo" 
      :disabled="!isFormValid"
      :class="{ 'btn-disabled': !isFormValid }"
    />
  </form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import ButtonRemove from '@/components/UI/ButtonRemove.vue'
import ButtonSave from '@/components/UI/ButtonSave.vue'
import ButtonAddChildren from '@/components/UI/ButtonAddChildren.vue'
import { usePersonalDataStore } from '@/stores/usePersonalDataStore'
import { storeToRefs } from 'pinia'
import { uid } from 'uid'
import FormInput from '@/components/FormInput.vue'

const PLACEHOLDER = {
  name: 'Имя',
  age: 'Возраст',
}

const personalDataStore = usePersonalDataStore()
const { savePersonalData } = storeToRefs(personalDataStore)

const localPerson = ref({
  name: '',
  age: '',
  id: uid(),
  errors: {
    ageError: '',
    nameError: '',
  }
})

const localChildren = ref([])

const isFormValid = computed(() => {
  const age = parseInt(localPerson.value.age);
  const ageError = localPerson.value.errors.ageError;

  return localPerson.value.name 
    && age
    && !ageError
    && localChildren.value.every(child => child.name && child.age && !child.ageError)
})

const validateName = (person) => {
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/;
    if (!nameRegex.test(person.target.value)) {
        localPerson.value.errors.nameError = 'Недопустимое имя'
    } else {
        localPerson.value.errors.nameError = ''
    }
}

const validateAge = () => {
  const age = parseInt(localPerson.value.age);

  if (isNaN(age) || age <= 0 || age > 150) {
    localPerson.value.errors.ageError = 'Недопустимый возраст'
  } else {
    localPerson.value.errors.ageError = ''
  }
  localPerson.value.age = localPerson.value.age.slice(0, 3)
}

const validateChildAge = (index) => {
  const age = parseInt(localChildren.value[index].age)

  if (isNaN(age) || age < 0 || age > 150) {
    localChildren.value[index].errors.ageError = 'Недопустимый возраст'
  } else {
    localChildren.value[index].errors.ageError = ''
  }
  localChildren.value[index].age = localChildren.value[index].age.slice(0, 3)
}

const addChild = () => {
  if (localChildren.value.length < 5) {
    localChildren.value.push({ 
        name: '', 
        age: '', 
        id: uid(),
        errors: {
            ageError: '', 
            nameError: '',
        } 
    })
  }
}

const removeChild = (index) => {
  localChildren.value.splice(index, 1)
}

const saveInfo = () => {
  if (isFormValid.value) {
    const person = {
      name: localPerson.value.name,
      age: parseInt(localPerson.value.age),
      id: localPerson.value.id,
      children: localChildren.value.map(child => ({
        name: child.name,
        age: parseInt(child.age),
        id: child.id,
      }))
    }
    personalDataStore.savePersonalData(person)
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 70%;
  max-width: 38.5rem;
  margin-top: 1.875rem;
  display: grid;
  flex-direction: column;
  gap: 2.75rem;
  grid-template-rows: auto auto;

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 0.625rem;

    &:first-child .form__input {
      width: 100%;
    }
  }

  &__title {
    padding-bottom: 0.625rem;
    font-weight: 500;
    line-height: $line-height-h3;
    font-size: $font-size-h2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__children-list {
    display: flex;
    gap: 2.92%;
    align-items: center;
  }

//   &__input-wrapper {
//     position: relative;
//     width: 100%;
//   }

//   &__input {
//     height: 3.5rem;
//     width: 100%;
//     border: 1px solid $color-GrayL;
//     border-radius: $button-border-radius;
//     padding-left: 0.625rem;
//     padding-top: 0.938rem;

//     &:focus + .form__placeholder,
//     &:focus-visible + .form__placeholder,
//     &:not(:placeholder-shown) + .form__placeholder {
//       top: 25%;
//       font-size: 0.813rem;
//     }

//     &--error {
//       background: $color-error;
//     }
//   }

//   &__placeholder {
//     position: absolute;
//     top: 50%;
//     left: 0.625rem;
//     transform: translateY(-50%);
//     color: $color-GrayK;
//     transition: $animation-default;
//   }

//   &__error {
//     font-size: 1rem;
//     position: absolute;
//     top: 50%;
//     right: 0.625rem;
//     transform: translateY(-50%);
//     color: $color-red;
//     transition: $animation-default;
//   }

  &__title-btn {
    @include buttonPrimaryWhite;
    background: $color-primary-white;
    padding: 0.625rem 1.25rem;
  }
}

.children-btn__remove {
  height: 1.5rem;
  background: white;
}

.btn-disabled {
  background: $color-primary-disabled;
}
</style>