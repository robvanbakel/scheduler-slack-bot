<script setup lang="ts">
const emit = defineEmits<{
  showParseSection: [];
}>();

const scrollToManual = () => {
  scrollBy({
    top: document.querySelector("#manual")?.getBoundingClientRect().top,
    behavior: "smooth",
  });
};
</script>

<template>
  <header>
    <div class="container">
      <div class="title">
        <div class="logo">
          <img src="/img/logo.png" alt="Scheduler logo" />
        </div>
        <h1>Easily add your<br />work schedule<br />to your Calendar!</h1>
        <button class="primary" @click="scrollToManual">Find out how</button>
        <button class="secondary" @click="emit('showParseSection')">
          or click here if you don't have Slack
        </button>
      </div>
      <div class="hero-image">
        <img src="/img/hero_phone.png" alt="Phone in hand" />
      </div>
    </div>
  </header>
</template>
