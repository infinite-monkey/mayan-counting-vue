<template>
    <nav class="level navbar" role="navigation" aria-label="main navigation">
      <div class="level-left">
          
      </div>
      <div class="level-right navbar-menu">
          <p class="level-item"><a href="javascript://" @click.prevent="navigate('app-about','About')">About Counting</a></p>
          <p class="level-item"><a href="javascript://" @click.prevent="navigate('app-instructions','How To Play')"">Instructions</a></p>
          <p class="level-item"><a href="javascript://" @click.prevent="navigate('app-contact','Contact Me')">Contact Me</a></p>
      </div>
    </nav>
</template>

<script>
    import { eventBus } from './main';

    export default {
      methods: {
        navigate(newView, title) {
          eventBus.$emit('changeView', {
              tag: newView,
              title: title
          });
        }
      }
    }
</script>