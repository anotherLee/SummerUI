<template>
  <div class="s-collapse-item">
    <div class="title" @click="toggle">{{ title }}</div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-collapse-item',
    inject: ['eventBus'],
    props: {
      title: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        open: false
      }
    },
    mounted() {
      this.eventBus.$on('selected', names => {
        if (names.indexOf(this.name) >= 0) {
          this.open = true
        } else {
          this.open = false
        }
      })
    },
    methods: {
      toggle() {
        if (this.open) {
          this.eventBus.$emit('removeSelected', this.name)
        } else {
          this.eventBus.$emit('addSelected', this.name)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  $grey: #ddd;
  $border-radius: 4px;
  .s-collapse-item {
    .title {
      display: flex; align-items: center;
      min-height: 32px;
      margin-top: -1px; margin-left: -1px; margin-right: -1px;
      padding-left: 1em;
      border: 1px solid $grey;
    }
    
    &:first-child {
      .title {
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
    }
    
    &:last-child  {
      > .title:last-child {
        margin-bottom: -1px;
        border-bottom-left-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
    }
    
    .content {
      padding-left: 1em;
    }
  }
</style>
