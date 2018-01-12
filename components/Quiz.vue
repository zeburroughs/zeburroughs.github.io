<template>
<div class="Quiz">

  <div class="row noback">
    <h1>{{ data.title }}</h1>
  </div>
  <div class="row dock">
    <dropzone id="dock" type="dock">
      <item v-for="(thing, i) in docked" :data="thing" dock="dock" ref="items" :key="i"> {{thing}} </item>
    </dropzone>
  </div>

  <div class="row noback">
    <button @click="check">check</button>
    <button @click="reset">reset</button>
    <button @click="hasSizes = !hasSizes">toggle sizes</button>
  </div>


  <div :class="['row', {'has-sizes': hasSizes}]" v-for="(row, i) in table">
    <div class="dropzone-wrapper" v-for="(item, j) in row" :style="{'width': getWidth(row, item) + '%', 'max-width': data.max}" :class="{
      'wrong': graded[getIndex(table, i, j)] === 'wrong',
      'correct': graded[getIndex(table, i, j)] === 'correct'
    }">
          <dropzone class="answer-dropzone"/>
          <div class="size" v-if="hasSizes">{{item.size}}</div>
    </div>
  </div>



</div>

</template>

<script>
import Dropzone from '~/components/Dropzone.vue'
import Item from '~/components/Item.vue'
export default {
  props: ['table', 'data'],
  data () {
    return {
      hasSizes: false,
      indexCount: 0,
      solution: [],
      docked: [],
      graded: [],
      answers: []
    }
  },
  mounted () {
    this.table.forEach(row => {
      row.forEach(item => {
        this.solution.push(item.name)
      })
    })
    // this.solution = [].concat.apply([], this.table)
    this.docked = this.rand(this.solution)

    this.getIndex(this.table, 0, 4)
  },
  methods: {
    getWidth (row, item) {
      let total = 0
      row.forEach(i => {
        total += parseInt(i.size)
      })
      let res = parseInt(item.size) / total * 100
      return res
    },
    getIndex ($table, $i, $j) {
      let count = $i * -1
      for (var i = 0; i <= $i; i++) {
        for (var j = 0; j <= $table[i].length; j++) {
          if (j > 0 || i > 0) {
            if (i < $i) count++
            else if (i === $i && j <= $j) count++
          }
        }
      }
      return count
    },
    rand (list) {
      let l = []
      list.forEach(thing => {
        let rand = Math.random()
        if (rand > 0.5) l.push(thing)
        else l.unshift(thing)
      })
      return l
    },
    getAnswers (type) {
      let list = []
      let answersNodes = document.querySelectorAll('.answer-dropzone')
      answersNodes.forEach((ansNode, index) => {
        if (type === 'child') list.push(ansNode.childNodes[0])
        else if (type === 'parent') list.push(ansNode.parentNode)
        else if (type === 'self') list.push(ansNode)
      })
      return list
    },
    reset () {
      this.answers = []
      this.graded = []
      this.$refs.items.forEach(vm => {
        vm.gohome(vm.$el)
      })
      this.docked = this.rand(this.solution)
    },
    check () {
      this.answers = []
      this.graded = []
      this.getAnswers('child').forEach((ans, index) => {
        if (ans) this.answers.push(ans.innerHTML.trim())
        else this.answers.push('')

        if (this.answers[index] === this.solution[index]) this.graded.push('correct')
        else this.graded.push('wrong')
      })
    }
  },
  components: {
    Dropzone,
    Item
  }
}
</script>

<style scoped>



.row {
  min-height: 80px;
  background: #f3f3f3;
  display: flex;
  margin: 1rem auto;
  width: 900px;
}

.row.has-sizes {
    margin-bottom: 2rem;
}

.row.noback {
    background: transparent;
}

button {
    margin-right: 1rem;
    padding: 1rem 2rem;
    background: #03A9F4;
    color: white;
    font-size: 1rem;
    height: 50px;
    border: none;
    outline: none;
}

button:hover {
  background: #40c4ff;
  cursor: pointer;
}



.row .dropzone-wrapper {
  display: inline-block;
  border: 1px solid;
  margin-left: -1px;
  min-width: 5%;
  flex-grow: 1;
  position: relative;
}

.row .dropzone {
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}


.item {
  border: 1px solid;
  padding: 0 1rem;
  display: inline-flex;
  align-items: center;
  height: 50px;
  box-sizing: content-box;
  margin: 10px;
  margin-left: -1px;
  margin-right: -1px;
  background: white;
}

.dock .item {
  margin: 10px;
}

.dropzone-wrapper .size {
    color: black;
    position: absolute;
    left: -1px;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 0.7rem;
    padding-top: 0.5rem;
    transform: translateY(100%);
    border-left: 1px solid;
    /* border-width: 0 1px; */
}

.item:hover {
  cursor: move;
}

.dropzone.active { background: #e8f4ff;}

.dropzone-wrapper.wrong {background: #ffd7d4}
.dropzone-wrapper.correct {background: #c3efc5}

.dock .dropzone { flex-grow: 1; justify-content: flex-start; flex-wrap: nowrap; overflow-x: auto;}
.dock .dropzone .item { flex-grow: 0}
</style>
