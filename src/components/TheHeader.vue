<template>
  <Teleport to="#header">
    <div class="header-container">
      <CompanyIcon class="header__logo"></CompanyIcon>
      <ul class="header__list">
        <router-link to="/form" class="link">
          <li class="header__list-item">Форма</li>
        </router-link>
        <router-link to="/preview" class="link">
          <li class="header__list-item">Превью</li>
        </router-link>
      </ul>
    </div>
  </Teleport>
</template>

<script setup>
import CompanyIcon from "@/components/icons/CompanyIcon.vue";
</script>

<style lang="scss">
.header {
  height: 100%;
  width: 100%;
  box-shadow: 0px 1px 0px rgba(17, 17, 17, 0.1);

  &-container {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    align-content: center;
    height: 100%;
    width: 100%;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem; //24px;

    &-item {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }

  &__logo {
    margin-left: 6.64%; //51px
  }
}
</style>
