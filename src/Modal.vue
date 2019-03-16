<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Your Answer</p>
            </header>
            <section class="modal-card-body">
                <div v-if="userAnswer !== -1">
                    <div id="user-answer">Your answer: <strong>{{ userAnswerDisplay }}</strong></div>
                    <div id="user-answer-message" v-html="userMessage"></div>
                    <div id="user-hint"></div>
                    <div id="user-stats">
                        Attempts: {{ userStats.attempts }}, Success: {{ userStats.success }} ({{successAverage(userStats.attempts, userStats.success) }})
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="field is-grouped">
                    <p class="control">
                        <button class="button is-success">Save changes</button>
                    </p>
                    <p class="control">
                        <button class="button is-info btn-close">Close</button>
                    </p>
                </div>
            </footer>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            userAnswer: Number,
            userAnswerDisplay: Number,
            userMessage: String,
            userStats: Object
        },
        computed: {
           
        },
        methods: {
            successAverage: function(attempts, success) {
                return Math.round((success / attempts) * 100) + '% accuracy';
            }
        }
    }

    $(function(j) {
        j(".modal-button").click(function() {
            j(".modal").addClass("is-active");  
        });

        j(".modal-close, .btn-close").click(function() {
            j(".modal").removeClass("is-active");
        });
    });
</script>