<script setup lang="ts">
const emit = defineEmits<{
  showParseSection: [];
}>();

const openParseHandler = async () => {
  emit("showParseSection");
  await nextTick();

  scrollBy({
    top: document.querySelector("#parse")?.getBoundingClientRect().top,
    behavior: "smooth",
  });
};

onMounted(() => {
  const questions = document?.querySelectorAll(".question");

  questions.forEach((question) => {
    question.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLDivElement)) return;
      const answer = e.target.nextElementSibling;

      if (!(answer instanceof HTMLDivElement)) return;

      if (e.target.parentElement?.classList.contains("open")) {
        e.target.parentElement.classList.remove("open");
        answer.style.height = "0";
      } else {
        // measure height of expanded answer
        answer.style.height = "auto";
        const openHeight = answer.offsetHeight + "px";
        answer.style.height = "0";

        // stop css transition
        answer.style.height = getComputedStyle(answer).height;

        questions.forEach((question) => {
          if (!(question instanceof HTMLDivElement)) return;
          question.parentElement?.classList.remove("open");

          if (!(question.nextElementSibling instanceof HTMLDivElement)) return;
          question.nextElementSibling.style.height = "0";
        });

        e.target.parentElement?.classList.add("open");
        answer.style.height = openHeight;
      }
    });
  });
});
</script>

<template>
  <section id="faq">
    <div class="container">
      <h2>Frequently Asked Questions</h2>

      <div class="question-wrapper">
        <div class="question">
          Can my employer or the app see my personal calendar?
        </div>
        <div class="answer">
          No, neither the employer or the app has access to your calendar. Upon
          receiving your work schedule from the Slack message, the Scheduler bot
          generates calendar events and sends them to your phone. Nowhere during
          this process is any of your personal data sent to the employer or the
          app. In fact, the Scheduler bot doesn't even handle your name in
          generating the calendar items.
        </div>
      </div>
      <div class="question-wrapper">
        <div class="question">Will my schedule be stored somewhere?</div>
        <div class="answer">
          After generating your calendar items, the bot will store your work
          schedule for 7 days. After this time, it will be deleted from our
          servers.
        </div>
      </div>
      <div class="question-wrapper">
        <div class="question">
          My work schedule doesn't show up in my calendar.
        </div>
        <div class="answer">
          After clicking the big green button in the message from the Scheduler
          bot, your phone opens the items in your calendar. Make sure to tap
          'Add All' or 'Import' in order to actually put the items in your
          calendar.
        </div>
      </div>
      <div class="question-wrapper">
        <div class="question">
          Can I put my work schedule in the calendar on my computer?
        </div>
        <div class="answer">
          Absolutely! The Scheduler bot is available from every device with
          Slack installed. On your computer, the Scheduler bot will download an
          <code>.ics</code> file, which you can open in your calendar to import
          your schedule. Alternatively, you can also get your calendar
          <a @click="openParseHandler">directly in the browser</a>.
        </div>
      </div>
      <div class="question-wrapper">
        <div class="question">What about Google Calendar?</div>
        <div class="answer">
          In Google Calendar, under 'My Calendars', click the on '+' icon and
          choose 'Import'. Pick the
          <code>.ics</code> file you've downloaded from Slack and choose in
          which calendar you want to add your schedule. Click 'Import' and
          that's it!
        </div>
      </div>
      <div class="question-wrapper">
        <div class="question">I have another question</div>
        <div class="answer">
          If you have a question about the Scheduler bot, feel free to message
          the Scheduler bot on Slack or send an email to
          <a href="mailto:scheduler@avsr.nl">scheduler@avsr.nl</a>.
        </div>
      </div>
    </div>
  </section>
</template>
