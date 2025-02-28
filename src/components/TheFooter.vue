<template>
  <Teleport to="#footer">
    <div class="footer-container">
      <div class="footer__text-container">
        <h3 class="footer-text">all rights reserved</h3>
      </div>
    </div>
  </Teleport>
</template>

<script setup></script>

<style lang="scss">
.footer {
  height: 100%;
  width: 100%;
  background: #fafafa;
  box-shadow: 0px 1px 0px rgba(17, 17, 17, 0.1);
}

.footer-container {
  display: grid;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.footer__text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
}

.footer-text {
  font-size: 0.813rem;
  line-height: 1rem;
}
</style>
