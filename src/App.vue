<template>
  <div class="container">
    <a name="top"></a>
    <div class="container">
        <div class="columns">
            <div class="column is-one-third">
                <header>
                    <h1 class="title">Mayan Number Counting</h1>
                    <h2 class="subtitle">Understanding Base-20</h2>
                </header>
            </div>
            <div class="column">
                <div class="navbar-brand">
                  <keep-alive>
                    <appTopMenu></appTopMenu>
                  </keep-alive>
                  <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </a>
                </div>
            </div>
        </div>
    </div>
    <section class="section">
      <div class="container">
          <div class="columns is-desktop is-centered">
              <div class="column is-2">
                  <h3 class="title">First</h3>
                  <h6 class="subtitle">Choose the size of the number</h6>
                  <div class="field">
                      <p class="control" v-for="range in ranges">
                         <a class="button is-outlined is-primary has-text-black" :title="range.title" @click="getNumber(range.id)">{{ range.title }}</a>
                      </p>
                  </div>
                  <p><small><strong>Note:</strong> You can click any button again to get a new number</small></p>
                  
                  <div v-if="numberToGuess !== 0" v-html="numberToGuessDisplay"></div>
              </div>
              <div class="column is-2">
                  <h3 class="title">Second</h3>
                  <h6 class="subtitle">Drag as many as the following images to the right</h6>

                  <ul style="list-style-type:none; margin-left:0;" id="drag-blocks">
                      <template v-for="piece in pieces">
                          <li class="draggable" :value="piece.count">
                              <img :src="piece.image" :alt="piece.alt" :class="piece.class" />
                          </li>
                      </template>
                  </ul>
                  <a href="javascript://" id="reset-answers">Reset Answers</a>
              </div>
              <div class="column is-2">
                  <h3 class="title">Third</h3>
                  <h6 class="subtitle">Drop your images into the selected boxes</h6>

                  <div class="field">
                      <input id="hint" type="checkbox" class="switch" v-model="hintToggle" true-value="yes" value="no">
                      <label for="hint">Toggle Hints</label>
                  </div>

                  <div
                      ref="boxAnswers"
                      is="box-answers"
                      v-for="box in boxes.slice().reverse()"
                      v-bind:key="box.id"
                      v-bind:level="box.level"
                      v-bind:hint="box.hint"
                  ></div>
              </div>
               <div class="column is-2">
                  <h3 class="title">Fourth</h3>
                  <h6 class="subtitle">Submit your answer when ready.</h6>

                  <a :disabled="numberToGuess < 1" class="button is-primary modal-button has-text-black" data-target="modal-ter" aria-haspopup="true" @click="verifyAnswer">Submit Answer</a>
              </div>
              <div class="column is-4">
                
                  <h3 class="title is-3 has-text-info">{{ currentView.title }}</h3>
                  <component :is="currentView.tag"></component>
                
              </div> 
          </div>
      </div>

      <modal
        :userAnswer="userAnswer"
        :userMessage="userMessage"
        :userAnswerDisplay="userAnswerDisplay"
        :userStats="userStats"
      ></modal>
    </section>
  </div>
</template>

<script>
  import Modal from './Modal.vue';
  import TopMenu from './TopMenu.vue';
  import About from './About.vue';
  import Contact from './Contact.vue';
  import Instructions from './Instructions.vue';

  import { eventBus } from './main';

export default {
  components: {
    modal: Modal,
    appTopMenu: TopMenu,
    appAbout: About,
    appContact: Contact,
    appInstructions: Instructions
  },
  created() {
    eventBus.$on('changeView', (data) => {
      let temp = [{
        tag: data.tag,
        title: data.title
      }];

      this.history = temp.concat(this.history.splice(0));
    });
  },
  data () {
    return {
      history: [
        {
          tag: 'app-about',
          title: 'About Mayan Counting'
        }
      ],
      activeView: 'app-about',
      numberToGuess: 0,
      range: 0,
      start_base: 0,
      userAnswer: -1,
      userMessage: '',
      userStats: {
          attempts: 0,
          success: 0
      },
      isCorrect: false,
      hintToggle: false,
      ranges: [
        { id: 1, title: 'One (1-9)' },
        { id: 2, title: 'Two (10-99)' },
        { id: 3, title: 'Three (100 - 999)' },
        { id: 4, title: 'Four (1000 - 9999)' }
      ],
      pieces: [
        { count: 1, image: 'images/dot.gif', alt: 'One', class: 'imgone' },
        { count: 5, image: 'images/line.gif', alt: 'Five', class: 'imgfive' },
        { count: 20, image: 'images/shell.gif', alt: 'Twenty/Zero', class: 'imgtwenty' }
      ],
      boxes: [
        { id: 1, level: 'baselevel-1', hint: 'hint-1' },
        { id: 2, level: 'baselevel-2', hint: 'hint-2' },
        { id: 3, level: 'baselevel-3', hint: 'hint-3' },
        { id: 4, level: 'baselevel-4', hint: 'hint-4' },
        { id: 5, level: 'baselevel-5', hint: 'hint-5' }
      ]
    }

  },
  computed: {
    userAnswerDisplay: function() {
      return this.userAnswer
    },
    numberToGuessDisplay: function() {
      return "Your Number: <strong>" + this.numberToGuess + "</strong>"
    },
    currentView() {
      return this.history[0];
    }
  },
  methods: {
    getNumber: function(range) {
      this.range = range;

      switch( this.range ) {
        case 1:
          this.start_base = 1;
          break;
        case 2:
          this.start_base = 10;
          break;
        case 3:
          this.start_base = 100;
          break;
        case 4:
          this.start_base = 1000;
          break;
        case 5:
          this.start_base = 10000;
          break;
        default:
          this.start_base = 10;
          break;
      }

      this.numberToGuess = this.getRandomArbitary(this.start_base, Math.pow(10, this.range));
    },
    getRandomArbitary: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    verifyAnswer: function() {
      let arBoxAnswers = [];
      let tempCounter = 0;

      const arAnswers = this.$refs.boxAnswers.map((x) => {
      let idx = x._uid - 1; //Subtract 1 to get box index (vue starts uid at 1)

          // Don't aggregate unless box has at least one item
          if ( x.$el.querySelectorAll('img.imgone').length ||
             x.$el.querySelectorAll('img.imgfive').length ||
             x.$el.querySelectorAll('img.imgtwenty').length
          ) {
            const ones = x.$el.querySelectorAll('img.imgone').length * 1;
            const fives = x.$el.querySelectorAll('img.imgfive').length * 5;
            const twenties = x.$el.querySelectorAll('img.imgtwenty').length * 0;

            arBoxAnswers.unshift(ones + fives + twenties); //Tally box value
        }
      });

      this.userAnswer = this.calculateUserResult( arBoxAnswers );

      this.userStats.attempts++; //Accrue how many times user tried

      if (this.numberToGuess == this.userAnswer ) {
        this.isCorrect = true;
        this.userStats.success++;
        this.userMessage = "<strong>Correct!</strong>";
      } else {
        this.isCorrect = false;
        if (this.numberToGuess > this.userAnswer) {
          this.userMessage = "<strong>Incorrect!</strong> Your answer is too low.";
        } else {
          this.userMessage = "<strong>Incorrect!</strong> Your answer is too high.";
        }
      }

    },
    calculateUserResult: function( arAnswers ) {

      let base20counter = 1; //First pass is always x1, then ^20 each iteration
      let counter = 0;
      let tmpAnswer = 0;

      for( let a=0; a<arAnswers.length; a++) {
          if (counter > 0) {
              base20counter *= 20;
          } else {
              base20counter = 1;  
          }
          
          tmpAnswer += arAnswers[a] * base20counter;
          counter++;
      }

      return tmpAnswer;
    },
    saveResult: function() {

    }
  }
}
</script>

<style>

</style>
