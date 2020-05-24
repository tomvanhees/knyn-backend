<template>
    <div></div>
</template>

<script>
    import http from "../../../http/http";
    export default {
        name   : "Index",
        data() {
            return {
                answers: []
            }
        },
        methods: {
            getAnswers() {
                http.get("/feedback/answers").then(response => {
                    this.answers = response.data
                })
            }
        },
        created() {
            this.getAnswers();
        }
    }
</script>

<style scoped>

</style>