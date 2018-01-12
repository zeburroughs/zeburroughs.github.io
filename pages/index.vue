<template>
  <div class="wrap">
    <div class="index">

    <h1>Header Study Guide</h1>

    <p>Study headers that can be used in a packet sniffer. Click a link to start studying. </p>

    <a href="/quiz/IEEE"> IEEE (RFC 1042)</a>
    <a href="/quiz/DIX"> IEEE (RFC 894)</a>
    <a href="/quiz/IP"> IP Header</a>
    <a href="/quiz/UDP"> UDP Header</a>
    <a href="/quiz/TCP"> TCP Header</a>

    </div>
  </div>
</template>

<script>
import Quiz from '~/components/Quiz.vue'
export default {
  components: {
    Quiz
  }
}
</script>

<style scoped>
  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .index {
    font-size: 1.5rem;
    display: inline-block;
    margin: auto;
    line-height: 3rem;
  }
  .index * {
    display: block;
  }
</style>
