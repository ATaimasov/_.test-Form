<template>
  <Teleport to="#header">
    <div class="header-container">
      <CopyrightsBlock class="header__logo" />
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
import CopyrightsBlock from "@/components/CopyrightsBlock.vue";
</script>

<style lang="scss">
.header {
  height: 100%;
  width: 100%;
  box-shadow: 0px 1px 0px rgba(17, 17, 17, 0.1);
}

.header-container {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  align-content: center;
  height: 100%;
  width: 100%;
}

.header__list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem; //24px;

  &-item {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.header__logo {
  margin-left: 6.64%; //51px
}
</style>
