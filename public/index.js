const btnManual = document.querySelector('header button.primary')
const sctManual = document.querySelector('section#manual')

btnManual.addEventListener('click', () => {

  window.scrollTo({
    top: sctManual.offsetTop + (sctManual.offsetHeight - window.innerHeight) / 2,
    behavior: 'smooth'
  });
});

// Manual Slider
const steps = document.querySelectorAll('.step');

const stepWidth = 420;

steps.forEach(step => {
  step.style.width = stepWidth + 'px';
})

const slideWidth = stepWidth + 120;

const Manual = {
  data() {
    return {
      currentStep: 0,
      videoScrollTriggered: false,
      btnNextText: 'Next<i class="fas fa-angle-right"></i>'
    }
  },
  computed: {
    step1() {
      return `transform: translateX(${slideWidth * (-this.currentStep + 0)}px)`
    },
    step2() {
      return `transform: translateX(${slideWidth * (-this.currentStep + 1)}px)`
    },
    step3() {
      return `transform: translateX(${slideWidth * (-this.currentStep + 2)}px)`
    }
  },
  mounted() {
    this.$refs.video.pause();
    window.addEventListener('scroll', e => {
      if (window.scrollY > sctManual.offsetTop + (sctManual.offsetHeight - window.innerHeight) / 2 - 100 && !this.videoScrollTriggered) {
        this.videoScrollTriggered = true;
        this.playPart(0, 1.3);
      }
    });
  },
  methods: {
    playPart(start, end) {

      this.$refs.video.currentTime = start;
      this.$refs.video.play();

      const pause = setInterval(() => {
        if (this.$refs.video.currentTime > end || this.$refs.video.ended) {
          this.$refs.video.pause();
          clearInterval(pause);
        }
      }, 1000 / 60);

    },
    next() {
      this.currentStep++;

      switch (this.currentStep) {
        case 0:
          this.playPart(0, 1.3);
          break;
        case 1:
          this.playPart(1.3, 4.5);
          break;
        case 2:
          this.playPart(4.5);
          this.btnNextText = 'Open Slack'
          break;
        case 3:
          this.currentStep = 2;
          window.location.href = 'slack://';
          break;
      }

    },
    back() {
      this.currentStep--;

      switch (this.currentStep) {
        case 0:
          this.playPart(0, 1.3);
          break;
        case 1:
          this.playPart(1.3, 4.5);
          this.btnNextText = 'Next<i class="fas fa-angle-right"></i>'
          break;
        case 2:
          this.playPart(4.5);
          break;
      }


    }

  }
}

Vue.createApp(Manual).mount('#manual')

// FAQ Accordion
const questions = document.querySelectorAll('.question')

questions.forEach(question => {
  question.addEventListener('click', e => {
    const answer = e.target.nextElementSibling;
    if (e.target.parentElement.classList.contains('open')) {
      e.target.parentElement.classList.remove('open');
      answer.style.height = '0';
    } else {

      // measure height of expanded answer
      answer.style.height = 'auto';
      const openHeight = answer.offsetHeight + 'px';
      answer.style.height = '0';

      // stop css transition
      answer.style.height = getComputedStyle(answer).height;

      questions.forEach(question => {
        question.parentElement.classList.remove('open');
        question.nextElementSibling.style.height = '0';
      });
      e.target.parentElement.classList.add('open');
      answer.style.height = openHeight;
    }
  });
});


// Section: Parse

const btnHero = document.querySelector('header button.secondary');
const userInput = document.querySelector('section#parse textarea')
const sctParse = document.querySelector('section#parse')
const faqParse = document.querySelector('section#faq a#showParse')

sctParse.style.height = '0px';

faqParse.addEventListener('click', () => {
  btnHero.click();
});

btnHero.addEventListener('click', () => {

  const openHeight = () => {
    if (sctParse.style.height == '0px') {

      // measure height of expanded section
      sctParse.style.height = 'auto';
      const openHeight = sctParse.offsetHeight;
      sctParse.style.height = '0px';

      // stop css transition
      sctParse.style.height = getComputedStyle(sctParse).height;

      sctParse.style.height = openHeight + 'px';

      return openHeight;

    } else {

      return sctParse.offsetHeight;

    }

  }

  const scrollToParseSection = openHeight => {

    window.scrollTo({
      top: window.innerHeight - openHeight / 2 - openHeight,
      behavior: 'smooth'
    });
  }

  scrollToParseSection(openHeight())

  setTimeout(function () {
    document.querySelector('section#parse textarea').focus();
  }, 500);

});

const Parse = {
  data() {
    return {
      userInput: null,
      icsDownloaded: false,
    }
  },
  methods: {
    async parse() {

      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schedule: this.userInput
        })
      });

      const { id } = await res.json()

      this.icsDownloaded = true

      window.location.replace('get/' + id);
    }
  }
}

Vue.createApp(Parse).mount('#parse')
