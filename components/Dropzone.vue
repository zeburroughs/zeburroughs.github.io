<template lang="html">
  <div class="dropzone"
      :data-uid="'dropzone-' + this._uid"
      @drop="drop($event)"
      @dragleave="dragleave($event)"
      @dragenter="dragenter($event)"
      @dragover="dragover($event)">
      <slot>

      </slot>
  </div>
</template>

<script>
export default {
  props: ['type'],
  data () {
    return {
      value: '',
      lastDrop: ''
    }
  },
  methods: {
    getByUid (uid) {
      return document.querySelectorAll('[data-uid="' + uid + '"]')[0]
    },
    resetChildren (el, dock) {
      if (this.type === 'dock') return
      let kids = el.childNodes
      let k = kids[kids.length - 1]
      let dockNode = document.getElementById(dock)
      if (kids.length > 0) {
        dockNode.appendChild(k)
      }
    },
    drop (e) {
      e.preventDefault()
      let targetuid = e.target.dataset.uid
      let uid = e.dataTransfer.getData('uid')
      let dock = e.dataTransfer.getData('dock')
      this.lastDrop = uid

      if (targetuid.startsWith('dropzone')) {
        this.resetChildren(e.target, dock)
        e.target.appendChild(this.getByUid(uid))
        e.target.classList.remove('active')
      } else if (targetuid.startsWith('item')) {
        let el = e.target.parentNode
        this.resetChildren(el, dock)
        el.appendChild(this.getByUid(uid))
        el.classList.remove('active')
      }
      this.value = e.dataTransfer.getData('data')
    },
    dragover (e) {
      e.preventDefault()
      let targetuid = e.target.dataset.uid
      e.dataTransfer.dropEffect = 'move'

      if (targetuid.startsWith('dropzone')) {
        e.target.classList.add('active')
      } else if (targetuid.startsWith('item')) {
        e.target.parentNode.classList.add('active')
      }
    },
    dragenter (e) {
      document.querySelectorAll('.dropzone').forEach(el => {
        el.classList.remove('active')
      })
    },
    dragleave (e) {
      e.target.classList.remove('active')
    }
  }
}
</script>

<style lang="css">

</style>
