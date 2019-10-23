<template>
  <div class="s-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <ol class="s-file-list">
      <li v-for="file in fileList">
        <template v-if="file.status === 'uploading'">
          <Icon class="loading" name="loading"></Icon>
        </template>
        <template v-else-if="file.type.indexOf('image') === 0">
          <img class="s-image" :src="file.url" alt="" width="32" height="32">
        </template>
        <template v-else>
          <div class="default-image"></div>
        </template>
        <span class="filename" :class="{[file.status]: file.status}">{{ file.name }}</span>
        <button class="s-uploader-remove" @click="onRemove(file)">×</button>
      </li>
    </ol>
    <div ref="inputWrapper" style="width: 0; height: 0; overflow: hidden"></div>
  </div>
</template>

<script>
  import Icon from '../icon/Icon'

  export default {
    name: 's-uploader',
    props: {
      name: { type: String, required: true },
      action: { type: String, required: true },
      method: { type: String, default: 'post' },
      parseResponse: { type: Function, required: true },
      fileList: { type: Array, default: () => [] },
      sizeLimit: { type: Number }
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
          // this.uploadFile(input.files[0])
          this.uploadFiles(input.files)
          input.remove()
        })
        input.click()
      },

      createInput() {
        this.$refs.inputWrapper.innerHTML = ''
        let input = document.createElement('input')
        input.type = 'file'
        input.multiple = true
        this.$refs.inputWrapper.appendChild(input)
        return input
      },

      beforeUploadFile(rawFile) {
        let { name, size, type } = rawFile

        if (size > this.sizeLimit) {
          this.$emit('error', '文件尺寸过大！')
          return false
        }

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
        return true
      },

      uploadFile(rawFile) {
        let bool = this.beforeUploadFile(rawFile)
        if (!bool) return
        let formData = new FormData()
        formData.append(this.name, rawFile)

        this.doUploadFile(formData, (response) => {
          let url = this.parseResponse(response)
          this.afterUploadFile(url)
        }, (xhr) => {
          let error = ''
          if (xhr.status === 0) {
            error = 'network error'
          }
          console.log(xhr)
          this.uploadError(error)
        })
      },

      uploadFiles(files) {
        let formData = new FormData()
        for (let i = 0; i < files.length; ++i) {
          formData.append(this.name, files[i])
        }
        let xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
        
        }
        xhr.send(formData)
      },

      afterUploadFile(url) {
        let uploadingFile = this.fileList.find(file => file === this.uploadingFile)
        let index = this.fileList.indexOf(uploadingFile)
        let copy = JSON.parse(JSON.stringify(uploadingFile))
        let copyFileList = JSON.parse(JSON.stringify(this.fileList))
        copy.url = url
        copy.status = 'success'
        copyFileList.splice(index, 1, copy)
        this.$emit('update:fileList', copyFileList)
        this.uploadingFile = {}
      },

      doUploadFile(formData, success, fail) {
        const xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          success(xhr.response)
        }
        xhr.onerror = () => {
          fail(xhr)
        }
        xhr.send(formData)
      },

      uploadError(error) {
        const file = this.fileList.find(file => file === this.uploadingFile)
        const index = this.fileList.indexOf(file)
        const copyFile = JSON.parse(JSON.stringify(file))
        const copyFileList = JSON.parse(JSON.stringify(this.fileList))
        copyFile.status = 'failed'
        copyFileList.splice(index, 1, copyFile)
        this.$emit('update:fileList', copyFileList)
        this.$emit('error', error)
        this.uploadingFile = {}
      },

      onRemove(file) {
        let copy = [...this.fileList]
        const index = copy.indexOf(file)
        copy.splice(index, 1)
        this.$emit('update:fileList', copy)
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  @import '../var';
  .s-uploader {
    .s-file-list {
      list-style: none;
      
      li {
        display: flex; align-items: center;
        margin: 8px 0;
        border: 1px solid darken($grey, 10%);
        
        .loading {
          width: 32px; height: 32px;
          animation: spin 1s linear infinite;
        }
        
        .s-image {
          margin-right: 8px;
        }
        
        .default-image {
          width: 32px; height: 32px;
        }
        
        .filename {
          &.success {
            color: green;
          }
          
          &.failed {
            color: red;
          }
        }
        
        .s-uploader-remove {
          display: inline-flex; justify-content: center; align-items: center;
          vertical-align: middle;
          width: 24px; height: 24px;
          margin-left: auto;
          font-size: 16px;
          border: 1px solid $border-color;
          border-radius: $border-radius;
          background-color: #fff;
        }
      }
    }
  }
</style>
