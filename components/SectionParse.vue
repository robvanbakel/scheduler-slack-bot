<script setup lang="ts">
const userInput = ref("");
const icsDownloaded = ref(false);

const parse = async () => {
  const data = await $fetch("/api/parse", {
    method: "POST",
    body: { message: userInput.value },
    redirect: "follow",
  });

  icsDownloaded.value = true;

  window.location.replace("data:text/calendar;charset=utf8," + encodeURI(data));
};
</script>

<template>
  <section id="parse">
    <div class="container">
      <div class="text">
        If you would rather generate your calender in the browser, you can!
        Paste the entire message you received from Planning in the input field
        and click 'Get Calendar'. Your computer will download an
        <code>.ics</code> file, which you can open in your calendar to import
        your schedule.
      </div>
      <form>
        <textarea
          v-if="!icsDownloaded"
          v-model="userInput"
          placeholder="Paste your message here"
        ></textarea>
        <div v-else class="output">
          <h4>All done 👍🏻</h4>
          Check your Downloads folder!
        </div>
        <button
          v-if="userInput && !icsDownloaded"
          class="primary small"
          @click.prevent="parse"
        >
          Get Calendar
        </button>
      </form>
    </div>
  </section>
</template>
