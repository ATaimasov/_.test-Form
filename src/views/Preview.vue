<template>
  <section class="section">
    <div class="preview" v-if="person.name">
      <div class="preview-container" >
        <h3 class="preview__title">Персональные данные</h3>
        <output class="preview__info">
          <b class="preview__info-text">{{ person.name }}, {{ person.age }} лет</b>
        </output>
      </div>
      <div class="preview-container" v-if="person.children.length">
        <h2 class="preview__title">Дети</h2>
        <output class="preview__info" v-for="child in person.children" :key="child.id">
          <div class="preview__info-child-container">
            <b class="preview__info-text preview__info-child">{{ child.name }}, {{ child.age }} лет</b>
          </div>
        </output>
      </div>
      <div class="preview-container" v-else>
        <h3 class="preview__title">Детей нет</h3>
      </div>
    </div>
    <div class="preview" v-else>
      <h2 class="preview__title">Данных нет</h2>
      <b class="preview__info-text">Добавьте данные в форму</b>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePersonalDataStore } from '@/stores/usePersonalDataStore'
import { storeToRefs } from 'pinia'

const personalDataStore = usePersonalDataStore()
const { person } = storeToRefs(personalDataStore)

</script>

<style lang="scss" scoped>
  .preview {
      width: 70%;
      max-width: 38.5rem;
      margin-top: 1.875rem;
      display: grid;
      flex-direction: column;
      gap: 3.75rem;
      grid-template-rows: auto auto;

    &__title {
      font-weight: 500;
      line-height: v.$line-height-h3;
      font-size: v.$font-size-h2;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 1.25rem;
      justify-content: center;
      align-content: center;
    }

    &__info {

      &-text {
        font-weight: 700;
        line-height: v.$line-height-h3;
        font-size: v.$font-size-h2;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-child-container {
        display: flex;
      }

      &-child {
        display: inline;
        height: 2.75rem;
        border: 1px solid v.$color-GrayL;
        background: v.$color-GrayL;
        border-radius: 4px;
        padding: 0.625rem 1.25rem;
      }
    }
  }

 



</style>
