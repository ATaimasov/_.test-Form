<template>
  <section class="section">
    <div class="preview" v-if="person.name">
      <div class="preview-container">
        <h3 class="preview__title">Персональные данные</h3>
        <output class="preview__info">
          <b class="preview__info-text"
            >{{ person.name }}, {{ person.age }} лет</b
          >
        </output>
      </div>
      <div class="preview-container" v-if="person.children.length">
        <h2 class="preview__title">Дети</h2>
        <output
          class="preview__info"
          v-for="child in person.children"
          :key="child.id"
        >
          <div class="preview__info-child-container">
            <b class="preview__info-text preview__info-child"
              >{{ child.name }}, {{ child.age }} лет</b
            >
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
import { computed } from "vue";
import { usePersonalDataStore } from "@/stores/usePersonalDataStore";
import { storeToRefs } from "pinia";

const personalDataStore = usePersonalDataStore();
const { person } = storeToRefs(personalDataStore);
</script>

<style lang="scss" scoped>
.preview {
  display: grid;
  grid-template-rows: auto auto;
  gap: 3.75rem;
  width: 70%;
  max-width: 38.5rem;
  margin-top: 1.875rem;
}

.preview__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: v.$font-size-h2;
  line-height: v.$line-height-h3;
  font-weight: 500;
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  row-gap: 1.25rem;
  width: 100%;
}

.preview__info-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: v.$font-size-h2;
  font-weight: 700;
  line-height: v.$line-height-h3;
}

.preview__info-child-container {
  display: flex;
}

.preview__info-child {
  display: inline;
  height: 2.75rem;
  padding: 0.625rem 1.25rem;
  background: v.$color-GrayL;
  border: 1px solid v.$color-GrayL;
  border-radius: 4px;
}
</style>
