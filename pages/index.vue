<script setup lang="ts">
const showParseSection = ref(false);

const onShowParseSection = () => {
  showParseSection.value = true;
};
</script>

<template>
  <div>
    <HomeHeader :onShowParseSection />
    <SectionParse v-if="showParseSection" />
    <SectionManual />
    <SectionFaq :onShowParseSection />
    <MainFooter />
  </div>
</template>
