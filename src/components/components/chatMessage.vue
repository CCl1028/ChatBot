<template>
  <!-- <div class="clear">
    <el-button type="primary" @click="openFullScreen2"> 重新加载 </el-button>
    <el-button type="primary" @click="clearScreen">清屏</el-button>
  </div> -->

  <div class="home" >
    <div v-for="(item, index) in chatArr" :key="index">
      <div :id="'reply'+index" class="reply" v-if="item.status === '0'">
        <div style="display:flex">
          <div class="avatar"><img width="50" src="@/assets/images/avatar.jpeg" alt=""></div>
          <div class="left"></div>
          <div v-if="item.content!=='loading'" class="content">{{ item.content }}</div>
          <div v-else class="loading"></div>
        </div>
      </div>
      <div class="question" v-if="item.status === '1'">
        <div class="content">{{ item.content }}</div>
        <div class="left"></div>
      </div>
    </div>
  </div>
</template>
<script >
import { defineComponent, reactive } from "vue";
import jsonData from "../data.json";
import store from '@/store/index.ts'

export default defineComponent({
  watch: {
    data(newValue) {
      this.addArr('1', this.sendMessage);
      this.replayFnc(); // 当监听到有消息传入的时候调用回复方法产生回复
    },
    recordStatus(newValue) {
      console.log(newValue);
      this.handleRecord(this.recordStatus);
    }
  },
  // props:['sendMessage']
  props: {
    sendMessage: {
      type: String,
      default: "",
    },
    data: 0,
    recordStatus: false,
  },
  setup(props) {
    let audioChunks = []

    let mediaRecorder = null

    let chatArr = reactive([
      {
        status: '0', // 0-回复，1-问题
        content: '你好，我是城运平台的信息查询 Agent，请问有什么能帮你的？'
      }
    ]);
    
    /** 判断问题，产生回复的方法 */
    function replayFnc() {
      let hasQuestion = false
      let replayMessage = '听不懂'
      addArr('0','loading')
      const url = '/api/process_prompt'
      fetchData(url, this.sendMessage)
      .then(data => {
          hasQuestion = true
        if(data){
          chatArr.pop()
          let plot = data.plot ? data.plot : ''
          addArr('0',formatReply(data.history),plot)
        } else {
          chatArr.pop()
          addArr('0','网络错误，请稍后再试') 
        }
        store.commit('updateLoading', !store.state.isLoading)
      })
    }

    /** 格式化回复内容 */
    function formatReply(reply){
      let data = reply[reply.length - 1]
      data = data[data.length - 1]
      // 将换行符替换为<br>
      return data.replace(/\\n/g, '<br>')
    }

    /** 封装fetch方法 */
    async function fetchData(url, prompt) {
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  prompt: prompt
              })
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();  // 假设服务器返回的是JSON数据
          return data;
      } catch (error) {
          console.error('fetchError',error);
      }
    }

    /** 添加进对话数组 */
    function addArr(status, content, plot) {
      let index = chatArr.length

      if(plot){        
        const config = JSON.parse(plot)
        let reply_id = 'reply' + index
        const plotDiv = document.createElement('div');
        plotDiv.id = `plot${index}`;
        plotDiv.style.width = '100%';
        plotDiv.style.height = '400px'; // 可根据需要调整大小
        plotDiv.style.marginLeft = '2.5rem';
        document.getElementById(reply_id).appendChild(plotDiv);
        Plotly.newPlot(`plot${index}`, config.data, config.layout);

      }
      let obj = {
        status: status,
        content: content,
      }
      chatArr.push(obj)
      return
    }



    /** 录音 */
    async function handleRecord(recordStatus) {
        if (!recordStatus) {
          const audioBlob = await stopRecording(mediaRecorder);
          sendAudioToServer(audioBlob, '/api/process_audio');
          return;
        } else {
          const stream = await getMicrophoneAccess();
          mediaRecorder = startRecording(stream);
        }
    }
    /** 获取麦克风权限 */
    async function getMicrophoneAccess(){
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            return stream;
        } catch (error) {
            console.error('Error accessing microphone:', error);
            throw error;
        }
    }

    /** 开始录音 */
    function startRecording(stream) {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();

        // 可选：收集录音数据
        const audioChunks = [];
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        return mediaRecorder;
    }
    /** 停止录音 */
    function stopRecording(mediaRecorder){
        mediaRecorder.stop();
        return new Promise((resolve) => {
            mediaRecorder.onstop = (event) => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                resolve(audioBlob);
            };
        });

    }
    /** 发送音频到服务器 */
    async function sendAudioToServer(audioBlob, url) {
        const formData = new FormData();
        formData.append('file', audioBlob);
        addArr('0','loading')
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                chatArr.pop()
                addArr('0','网络错误，请稍后再试')
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Audio file successfully uploaded.');
            let reply = await response.json()
            chatArr.pop()
            addArr('0',formatReply(reply.history),reply.plot)
            // store.commit('updateLoading', !store.state.isLoading)
        } catch (error) {
            console.error('Error sending audio to server:', error);
            chatArr.pop()
            addArr('0','网络错误，请稍后再试')
        }
    }

    /** 清屏 */
    function clearScreen(){
      chatArr.length = 0
      console.log(chatArr);
    }
    /** 加载中... */
    const openFullScreen2 = () => {
        const loading = ElLoading.service({
            lock: true,
            text: '',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        setTimeout(() => {
            loading.close()
        }, 2000)
    }
    return {
      clearScreen,
      replayFnc,
      addArr,
      chatArr,
      openFullScreen2,
      handleRecord,
      sendAudioToServer,
      stopRecording,
      startRecording,
      getMicrophoneAccess
    }
  }
});
</script>

<style lang="scss" scoped>
.clear{
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: right;
}
.home {
  // height: 70vh;
  position: relative;
  // width: 100%;
  overflow: auto; // 滚动条
}

// 回复的样式
.reply {
  display: flex;
  margin-top: 1rem;
  flex-direction: column;

  .content {
    margin-left: 0.8rem;
    background: #FFFFFF;
    padding: 15px;
    max-width: 60%;
    border-radius: 10px;
    border: 1px solid;
    color: #000;
  }

  .loading {
    margin-left: 0.8rem;
    background: #FFFFFF;
    width: 1.2rem;
    padding: 15px;
    max-width: 60%;
    border-radius: 10px;
    border: 1px solid;
    color: #000;
  }

  .loading:after {
    content: '...';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%, 20% {
      color: rgba(0,0,0,0);
      text-shadow:
          .25em 0 0 rgba(0,0,0,0),
          .5em 0 0 rgba(0,0,0,0);
    }
    40% {
      color: black;
      text-shadow:
          .25em 0 0 rgba(0,0,0,0),
          .5em 0 0 rgba(0,0,0,0);
    }
    60% {
      text-shadow:
          .25em 0 0 black,
          .5em 0 0 rgba(0,0,0,0);
    }
    80%, 100% {
      text-shadow:
          .25em 0 0 black,
          .5em 0 0 black;
    }
  }

}

// 提问的样式
.question {
  display: flex;
  margin-top: 1rem;
  justify-content: right;

  .content {
    background: #F2F2F2;
    padding: 15px;
    max-width: 500px;
    border-radius: 10px;
    border: 1px solid;
    color: #000;
  }
}

</style>
