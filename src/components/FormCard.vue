<template>
  <form class="form" @submit.prevent="saveInfo">
    <div class="form__container">
      <h2 class="form__title">Персональные данные</h2>
      <FormInput
      v-model="localPerson.name"
      :errorName="PLACEHOLDER.errors.nameError"
      :hasError="localPerson.errors.nameError"
      :placeholder="PLACEHOLDER.name"
      @validate="validateName"
      />
      <FormInput
      v-model="localPerson.age"
      :errorName="PLACEHOLDER.errors.ageError"
      :hasError="localPerson.errors.ageError"
      :placeholder="PLACEHOLDER.age"
      @validate="validateAge"
      :maxLength="3"
      />
    </div>
    <div class="form__container">
      <div class="form__title">
        <h2 class="form__title-header">Дети (макс. 5)</h2>
        <ButtonAddChildren 
          class="form__title-btn"
          @click="addChild" 
          :disabled="localChildren.length >= 5"
          :class="{ 'form__title-btn--disabled': localChildren.length >= 5 }"
        />
      </div>
      <div 
        v-for="(child, index) in localChildren"
        :key="child.id"
        class="form__children-list"
      >
        <FormInput
        v-model="child.name"
        :errorName="PLACEHOLDER.errors.nameError"
        :hasError="child.errors.nameError"
        @validate="(value) => validateChildName(index, value)"
        :placeholder="PLACEHOLDER.name"
        />
        <FormInput
        v-model="child.age"
        :errorName="PLACEHOLDER.errors.ageError"
        :hasError="child.errors.ageError"
        @validate="(value) => validateChildAge(index, value)"
        :placeholder="PLACEHOLDER.age"
        :maxLength="3"
        />
        <ButtonRemove @click="removeChild(index)" />
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
// import { onDeactivated, onActivated } from 'vue'
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
  errors: {
    nameError: 'Недопустимое имя',
    ageError: 'Недопустимый возраст',
  }
}

const personalDataStore = usePersonalDataStore()
const { savePersonalData } = storeToRefs(personalDataStore)

const localPerson = ref({
  name: '',
  age: null,
  id: uid(),
  errors: {
    ageError: false,
    nameError: false,
  }
})

const localChildren = ref([])

const isFormValid = computed(() => {
  const age = parseInt(localPerson.value.age);
  const ageError = localPerson.value.errors.ageError;
  const nameError = localPerson.value.errors.nameError;

  return localPerson.value.name 
    && age
    && !ageError
    && !nameError
    && localChildren.value.every(child => child.name && child.age && !child.ageError && !child.nameError)
})

const validateName = (value) => {
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/;
    if (!nameRegex.test(value)) {
        localPerson.value.errors.nameError = true
    } else {
        localPerson.value.errors.nameError = false
    }
}

const validateAge = (value) => {
  const ageRegex = /^[0-9]+$/

  if(!ageRegex.test(value)) {
    localPerson.value.errors.ageError = true
  } else {
    localPerson.value.errors.ageError = false
  }
  localPerson.value.age = value.slice(0, 3)
}


const addChild = () => {
  if (localChildren.value.length < 5) {
    localChildren.value.push({ 
        name: '', 
        age: null, 
        id: uid(),
        errors: {
            ageError: false, 
            nameError: false,
        } 
    })
  }
}

const removeChild = (index) => {
  localChildren.value.splice(index, 1)
}

const validateChildName = (index, value) => {
  const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/;
  if (!nameRegex.test(value)) {
    localChildren.value[index].errors.nameError = true
  } else {
    localChildren.value[index].errors.nameError = false
  }
}

const validateChildAge = (index, value) => {
  const ageRegex = /^[0-9]+$/

  if(!ageRegex.test(value)) {
    localChildren.value[index].errors.ageError = true
  } else {
    localChildren.value[index].errors.ageError = false
  }

  localChildren.value[index].age = value.slice(0, 3)
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

  &__title-btn {
    @include buttonPrimaryWhite;
    background: $color-primary-white;
    padding: 0.625rem 1.25rem;

    &:hover:not(&--disabled) {
      background: $color-primary-hover;
      color: $color-primary-white;
      border-color: transparent;
    }

    // &--disabled.btn {
    //     background: $color-primary-disabled;
    //     color: $color-primary-white;
    //     border-color: transparent;
    // }
    // in the test task asked to disappear  button. this is opposed UI kit (button have disabled state) 
    &--disabled.btn {
        opacity: 0;
    }
  }
}

.btn-disabled {
  background: $color-primary-disabled;
}
</style>