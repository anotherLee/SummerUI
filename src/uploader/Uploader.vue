<template>
  <div class="s-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="inputWrapper" style="width: 0; height: 0; overflow: hidden"></div>
    <ol>
      <li v-for="file in fileList">
        <template v-if="file.status === 'uploading'">加载中</template>
        <img :src="file.url" alt="" width="100" height="100">
        {{ file.name }}
        <button @click="onRemove(file)">x</button>
      </li>
    </ol>
  
  </div>
</template>

<script>
  export default {
    name: 's-uploader',
    props: {
      name: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      method: {
        type: String,
        default: 'post'
      },
      parseResponse: {
        type: Function,
        required: true
      },
      fileList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        uploadingFile: {}
      }
    },
    methods: {
      onClickUpload() {
        const input = this.createInput()
        input.addEventListener('change', () => {
          let file = input.files[0]
          this.uploadFile(file)
          input.remove()
        })
        input.click()
      },

      createInput() {
        let input = document.createElement('input')
        input.type = 'file'
        this.$refs.inputWrapper.appendChild(input)
        return input
      },
      
      beforeUploadFile(rawFile) {
        let { name, size, type } = rawFile
        
        while (this.fileList.find(file => file.name === name)) {
          const dotIndex = name.lastIndexOf('.')
          let nameWithoutExtension, extension
          if (dotIndex > -1) {
            nameWithoutExtension = name.substring(0, dotIndex)
            extension = name.substring(dotIndex)
          }
          name = nameWithoutExtension + '(1)' + extension
        }
        
        this.uploadingFile = { name, size, type, status: 'uploading' }
        
        this.$emit('update:fileList', [...this.fileList, this.uploadingFile])
      },

      uploadFile(rawFile) {
        this.beforeUploadFile(rawFile)
        let formData = new FormData()
        formData.append(this.name, rawFile)
        this.doUploadFile(formData, (response) => {
          let url = this.parseResponse(response)
          
          this.afterUploadFile(url)
        })
      },
      
      afterUploadFile(url) {
        let uploadingFile = this.fileList.find(file => file === this.uploadingFile)
        let index = this.fileList.indexOf(uploadingFile)
        let copy = JSON.parse(JSON.stringify(uploadingFile))
        let copyFileList = JSON.parse(JSON.stringify(this.fileList))
        copy.url = url
        copy.status = 'sucess'
        copyFileList.splice(index, 1, copy)
        this.$emit('update:fileList', copyFileList)
        this.uploadingFile = {}
      },

      doUploadFile(formData, success) {
        const xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          success(xhr.response)
        }
        xhr.send(formData)
      },
      
      onRemove(file) {
        let copy = [...this.fileList]
        const index = copy.indexOf(file)
        copy.splice(index, 1)
        this.$emit('update:fileList', copy)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-uploader {
    border: 1px solid red;
  }
</style>
