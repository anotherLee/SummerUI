<template>
  <div class="s-collapse-item">
    <div class="title" @click="toggle">{{ title }}</div>
    <div class="content" v-if="isOpen">
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
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    mounted() {
      this.eventBus && this.eventBus.$on('update:selected', vm => {
        if (vm !== this) {
          this.close()
        }
      })
    },
    methods: {
      toggle() {
        if (this.isOpen) {
          this.close()
        } else {
          this.open()
          this.eventBus && this.eventBus.$emit('update:selected', this)
        }
      },
      close() {
        this.isOpen = false
      },
      open() {
        this.isOpen = true
      }
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
