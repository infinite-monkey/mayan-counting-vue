<template>
    <div>
        <h3 class="title is-3 has-text-info">Contact Me</h3>
    	<div class="card">
    		<header class="card-header">
    			<p class="card-header-title">David Patricola</p>
    		</header>
    		<div class="card-content">
    			<div class="content has-text-justified">
    				This tool/puzzle was built using <a href="https://vuejs.org" target="_blank">Vue.js</a> (SPA), <a href="https://www.npmjs.com/" target="_blank"><abbr title="Node Project Manager">NPM</abbr></a> and <a href="https://bulma.io" target="_blank">Bulma</a>. My love of mathematics provided a wonderful way for me to learn a new language platform in the process.
    			</div>
    		</div>
    		<footer class="card-footer">
    			<a href="//www.infinitemonkeybytes.com" class="card-footer-item" target="_blank">Website</a>
    			<a href="mailto:david@infinitemonkeybytes.com" class="card-footer-item">Email</a>
    			<a href="//www.linkedin.com/in/davidpatricola/" class="card-footer-item" target="_blank">Linked In</a>
    		</footer>
    	</div>
    </div>
</template>

<script>
    export default {
        activated() {
           // console.log('Hai!');
        },
        deactivated() {
           // console.log('Bye!');
        }
    }
</script>