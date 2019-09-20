<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
  const validator = (value) => {
    const keys = Object.keys(value)
    let valid = true
    keys.forEach(key => {
      const hasKey = ['span', 'offset'].indexOf(key) !== -1
      if (!hasKey) {
        valid = hasKey
      }
    })
    return valid
  }
  
  const generateClass = (arr) => {
    let className = ['phone', 'pad', 'narrow', 'pc']
    let newClass = []
    arr.forEach((c, index) => {
      for (let key in c) {
        if (c[key]) {
          newClass.push(`col-${className[index]}-${key}-${c[key]}`)
        }
      }
    })
    return newClass
  }

  export default {
    name: 's-col',
    props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String]
      },
      phone: { type: Object, validator },
      pad: { type: Object, validator },
      narrow: { type: Object, validator },
      pc: { type: Object, validator }
    },
    computed: {
      colClass() {
        const { span, offset, phone, pad, narrow, pc } = this
        const leftProps = [phone, pad, narrow, pc]
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`,
          ...generateClass(leftProps)
        ]
      },
      colStyle() {
        return {
          padding: `0 ${parseInt(this.gutter) / 2}px`
        }
      }
    },
    data() {
      return {
        gutter: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .col {
    height: 50px;
    
    $class-prefix: col-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: $n / 24 * 100%;
      }
    }
    
    $class-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: $n / 24 * 100%;
      }
    }
    
    /*手机*/
    @media (max-width: 576px) {
      $class-phone-span: col-phone-span-;
      @for $n from 1 through 24 {
        &.#{$class-phone-span}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      
      $class-phone-offset: col-phone-offset-;
      @for $n from 1 through 24 {
        &.#{$class-phone-offset}#{$n} {
          width: $n / 24 * 100%;
        }
      }
    }
    
    /*ipad*/
    @media (min-width: 577px) and (max-width: 768px) {
      $class-pad-span: col-pad-span-;
      @for $n from 1 through 24 {
        &.#{$class-pad-span}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      
      $class-pad-offset: col-pad-offset-;
      @for $n from 1 through 24 {
        &.#{$class-pad-offset}#{$n} {
          width: $n / 24 * 100%;
        }
      }
    }
    
    /*窄屏幕*/
    @media (min-width: 769px) and (max-width: 992px) {
      $class-narrow-span: col-narrow-span-;
      @for $n from 1 through 24 {
        &.#{$class-narrow-span}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      
      $class-narrow-offset: col-narrow-offset-;
      @for $n from 1 through 24 {
        &.#{$class-narrow-offset}#{$n} {
          width: $n / 24 * 100%;
        }
      }
    }
    
    /*普通PC*/
    @media (min-width: 993px) and (max-width: 1200px) {
      $class-pc-span: col-pc-span-;
      @for $n from 1 through 24 {
        &.#{$class-pc-span}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      
      $class-pc-offset: col-pc-offset-;
      @for $n from 1 through 24 {
        &.#{$class-pc-offset}#{$n} {
          width: $n / 24 * 100%;
        }
      }
    }
    
  }
</style>
