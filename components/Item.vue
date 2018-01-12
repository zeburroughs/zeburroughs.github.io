<template lang="html">
  <div class="item"
      :data-uid="'item-' + this._uid"
      draggable="true"
      @drop="drop($event)"
      @dragstart="dragstart($event)"
      >
      <slot>

      </slot>
  </div>
</template>

<script>
export default {
  props: ['data', 'dock'],
  methods: {
    gohome (el) {
      document.getElementById(this.dock).appendChild(el)
    },
    dragstart (e) {
      e.dataTransfer.dropEffect = 'copy'
      e.dataTransfer.setData('uid', e.target.dataset.uid)
      e.dataTransfer.setData('data', this.data)
      e.dataTransfer.setData('dock', this.dock)
    },
    drop (e) {
      e.preventDefault()
      return false
    }
  }
}
</script>

<style lang="css">
.item {
  border: 1px solid;
  padding: 1rem;
  display: inline-block;
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
</style>
