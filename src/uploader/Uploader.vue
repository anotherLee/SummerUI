<template>
  <div class="s-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <ol class="s-file-list">
      <li v-for="file in files">
        <span class="filename" :class="{[file.status]: file.status}">{{ file.name }}</span>
        <template v-if="true">
          <div class="s-progress-wrapper" v-if="file.progress !== 1">
            <div class="s-progress" :style="{ width: file.progress + '%' }"></div>
          </div>
        </template>
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
      sizeLimit: { type: Number },
      multiple: { type: Boolean, default: false }
    },
    data() {
      return {
        files: [],
        finishedFiles: [], // 不管 status 如何，已经结束的 files
      }
    },
    methods: {
      /*
       * 点击上传按钮，创建 input 并模拟点击进行上传
       */
      onClickUpload() {
        const input = this.createInput()
        input.addEventListener('change', () => {
          this.uploadFiles(input.files)
          input.remove()
        })
        input.click()
      },

      /*
       * 创建 input type=file
       */
      createInput() {
        this.$refs.inputWrapper.innerHTML = ''
        let input = document.createElement('input')
        input.type = 'file'
        if (this.multiple) {
          input.multiple = true
        }
        this.$refs.inputWrapper.appendChild(input)
        return input
      },
      
      uploadFiles(files) {
        for (let i = 0; i < files.length; ++i) {
          const rawFile = files[i]
          let { name, type, size } = rawFile
          if (this.beforeUploadFile(rawFile)) {
            const current = { name, type, size, status: 'uploading', progress: 0 }
            this.files.push(current)
            let formData = new FormData()
            formData.append(this.name, rawFile)
            
            this.doUploadFile(formData, current, (currentFile, response) => {
              this.$set(currentFile, 'status', 'completed')
              this.finishedFiles.push(currentFile)
              this.$emit('success', response)
              this.judgeAllFinished()
            }, (currentFile, xhr) => {
              this.$set(currentFile, 'status', 'error')
              this.finishedFiles.push(currentFile)
              this.$emit('error', xhr)
              this.judgeAllFinished()
            })
          } else {
            this.files.push({ name, type, size, status: 'error', progress: 100 })
            this.finishedFiles.push({ name, type, size, status: 'error', progress: 100 })
            this.judgeAllFinished()
          }
        }
      },
      
      judgeAllFinished() {
        if (this.finishedFiles.length === this.files.length) {
          this.$emit('complete')
        }
      },

      /*
       * 当图片被浏览器读取但没上传到服务器时，对图片进行处理
       */
      beforeUploadFile(rawFile) {
        let { name, size, type } = rawFile

        if (size > this.sizeLimit) {
          this.$emit('error', `${name} 文件尺寸过大！`)
          return false
        }
        return true
      },

      /*
       * 使用 xhr 上传，并进行回调
       */
      doUploadFile(formData, currentFile, success, fail) {
        const xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          if (xhr.status === 200) {
            success(currentFile, xhr.response)
          } else {
            fail(currentFile, xhr)
          }
        }
        
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            let progress = e.loaded / e.total
            this.$set(currentFile, 'progress', progress)
          }
        }
        
        xhr.onerror = () => {
          fail(xhr)
        }
        xhr.send(formData)
      },
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
      margin-top: 10px;
      li {
        position: relative;
        margin: 8px 0; padding-bottom: 8px;
        
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
          display: inline-block;
          font-size: 14px;
          &.error {
            color: red;
          }
        }
        
        .s-progress-wrapper {
          position: absolute; bottom: 0px; width: 100%;
          height: 2px; background-color: #ddd;
          .s-progress {
            height: 100%;
            background-color: #2d8cf0;
          }
        }
      }
    }
  }
</style>
