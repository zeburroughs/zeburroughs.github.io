<template>
<div >

<quiz :table="data[thing].key" :data="data[thing]" v-if="data[thing]"/>
<div v-else>
  This quiz does not exist.
</div>

</div>
</template>

<script>
import Quiz from '~/components/Quiz.vue'
import data from '~/static/Quiz.json'
export default {
  data () {
    return {
      data: data,
      thing: this.$route.params.name
    }
  },
  components: {
    Quiz
  }
}
</script>

<style scoped>

</style>
