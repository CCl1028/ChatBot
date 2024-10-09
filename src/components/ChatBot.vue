<template>
    <div class="screen">
        <div class="right">
            <div class="up">
                <chatMessage :sendMessage="sendMessage" :data='data' :recordStatus="isRecording"/>
            </div>
            <div style="display:flex; justify-content:center;">
                <div class="input">
                    <div class="audio" @click="changeRecord"><img width="50" src="@/assets/images/audio-icon.png" alt=""></div>
                    <input class="inputStyle" v-model="message" placeholder=" 请输入..." @keyup.enter="send" />
                    <!-- <el-input class="inputStyle" v-model="message" placeholder="Please input your problem" clearable /> -->
                    <button :class="'sendButtonStyle_' + store.state.isLoading" @click="send">发送</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import chatMessage from './components/chatMessage.vue'
import store from '@/store/index.ts'

/** 发送消息模块 */
let message = ref('')
let sendMessage = ref('')
let data = ref() // 定义一个时间戳，方便检查是否更新发送了数据
let isRecording = ref(false)

/** 发送消息 */
function send() {
    if(!message.value){
        return
    }
    if(store.state.isLoading){
        return
    }
    sendMessage.value = message.value
    data.value = Date.now()
    message.value = ''
    store.commit('updateLoading', !store.state.isLoading);
}

function changeRecord() {
    isRecording.value = !isRecording.value
}

/** 刷新加载 */
onMounted(() => {
    // openFullScreen2();
    window.addEventListener("keydown", keyDown);
});
/** 回车方法 */
function keyDown(e: any) {
    // 回车则执行登录方法 enter键的ASCII是13
    if (e.key == 'Enter') {
        send()
    }
}

</script>
  
<style scoped>
.screen {
    /* height: 100vh; */
    display: flex;
    flex-direction: row;
    background: rgb(236, 239, 246);
}

.right {
    width: 100%;
    position: relative;
}

.up {
    position: absolute;
    padding: 0.6rem;
    width: 100%;
    box-sizing: border-box;
    /* align-items: center; */
}

.input {
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    height: 5rem;
    background: #fff;
    align-items: center;
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
}

.inputStyle {
    width: 85%;
    height: 3rem;
    border-radius: 2rem;
    /* box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1); */
    border: 2px solid #000;
    font-size: 1.3rem;
    /* margin-left: 1rem; */
    /* 输入文本左侧的margin */
}

.sendButtonStyle_false {
    width: 5.5rem;
    height: 3.35rem;
    border-radius: 2rem;
    background: #000;
    color: #fff;
    font-size: 1.3rem;
    margin-left: 1rem;
    margin-right: 1rem;
}
.sendButtonStyle_true {
    width: 5.5rem;
    height: 3.35rem;
    border-radius: 2rem;
    background: #7C7C7C;
    color: #fff;
    font-size: 1.3rem;
    margin-left: 1rem;
    margin-right: 1rem;
}
.audio {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
</style>