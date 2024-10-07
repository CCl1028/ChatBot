<template>
  <div class="home">
    <div class="title">我能做什么？</div>
    <div class="menu">
      <div class="item" v-for="item in menuItem">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
let menuItem=['陪你唠嗑','发现生活','周游世界','吃吃喝喝','一起长胖']
</script>

<style lang="scss" scoped>
.home{
    width: 200px;
    height: 100%;
    background: linear-gradient(to bottom, rgb(238,231,235), rgb(221,221,245));
}
.title{
    color: rgb(81,122,237);
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 26px;
    border-bottom: 1px solid rgb(222,219,232);
}
.menu{
  .item{
    font-size: 18px;
    text-align: center;
    height: 60px;
    line-height: 60px;
  }
  .item:hover{
    cursor: pointer;
    background: rgb(221,221,245);
  }
}
</style>
