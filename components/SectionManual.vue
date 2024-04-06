<script setup lang="ts">
const video = ref<HTMLVideoElement>();
const section = ref<HTMLDivElement>();

const slideWidth = computed(() => stepWidth.value + 80);

const stepWidth = ref(460);
const currentStep = ref(0);
const videoScrollTriggered = ref(false);
const btnNextText = ref('Next<i class="fas fa-angle-right"></i>');

const step1 = computed(() => {
  return `width: ${stepWidth.value}px; transform: translateX(${slideWidth.value * (-currentStep.value + 0)}px)`;
});

const step2 = computed(() => {
  return `width: ${stepWidth.value}px; transform: translateX(${slideWidth.value * (-currentStep.value + 1)}px)`;
});

const step3 = computed(() => {
  return `width: ${stepWidth.value}px; transform: translateX(${slideWidth.value * (-currentStep.value + 2)}px)`;
});

const playPart = (start: number, end?: number) => {
  if (!video.value) return;

  video.value.currentTime = start;
  video.value.play();

  const pause = setInterval(() => {
    if (!video.value) return;

    if ((end && video.value.currentTime > end) || video.value.ended) {
      video.value.pause();
      clearInterval(pause);
    }
  }, 1000 / 60);
};

const next = () => {
  currentStep.value++;

  switch (currentStep.value) {
    case 0:
      playPart(0, 1.3);
      break;
    case 1:
      playPart(1.3, 4.5);
      break;
    case 2:
      playPart(4.5);
      btnNextText.value = "Open Slack";
      break;
    case 3:
      currentStep.value = 2;
      window.location.href = "slack://";
      break;
  }
};

const back = () => {
  currentStep.value--;

  switch (currentStep.value) {
    case 0:
      playPart(0, 1.3);
      break;
    case 1:
      playPart(1.3, 4.5);
      btnNextText.value = 'Next<i class="fas fa-angle-right"></i>';
      break;
    case 2:
      playPart(4.5);
      break;
  }
};

onMounted(() => {
  video.value?.pause();

  window.addEventListener("scroll", () => {
    if (
      section.value &&
      window.scrollY >
        section.value.offsetTop +
          (section.value?.offsetHeight - window.innerHeight) / 2 -
          100 &&
      !videoScrollTriggered.value
    ) {
      videoScrollTriggered.value = true;
      playPart(0, 1.3);
    }
  });
});
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <section id="manual" ref="section">
    <div class="phone-wrapper">
      <video
        ref="video"
        src="/img/manual_phone.mp4"
        autoplay
        muted
        playsinline
      ></video>
    </div>
    <div class="steps">
      <div
        id="step1"
        class="step"
        :style="step1"
        :class="currentStep == 0 ? 'active' : ''"
      >
        <h6>Step 1</h6>
        <h2>Tap and Hold</h2>
        <p>
          Open the Actions menu by long pressing the message containing your
          schedule.
        </p>
      </div>
      <div
        id="step2"
        class="step"
        :style="step2"
        :class="currentStep == 1 ? 'active' : ''"
      >
        <h6>Step 2</h6>
        <h2>Pick Scheduler</h2>
        <p>In the Actions menu that pops up, scroll down and pick Scheduler.</p>
      </div>
      <div
        id="step3"
        class="step"
        :style="step3"
        :class="currentStep == 2 ? 'active' : ''"
      >
        <h6>Step 3</h6>
        <h2>Add to Calendar</h2>
        <p>
          Tap the big button to bring up your phone’s calendar. Here, tap Add
          All.
        </p>
      </div>
    </div>

    <div class="buttons">
      <button v-if="currentStep != 0" class="secondary" @click="back">
        <i class="fas fa-angle-left"></i>Back
      </button>
      <button
        class="primary small"
        :class="currentStep == 2 ? 'slack' : ''"
        @click="next"
        v-html="btnNextText"
      ></button>
    </div>
  </section>
</template>
