<template>
  <div class="cover" :style="'background-image: url(' + background_url + ');'"></div>

  <div class="body">

    <div class="container">

      <div class="head">
        <Head></Head>
      </div>
      <div class="exhibit" v-if="route.path=='/'">
        <div class="home-exhibit">
          <el-carousel :interval="4000"
                      type="card"
                      height="200px"  indicator-position="none">
            <el-carousel-item v-for="item in exhibits"
                              :key="item">
                  <img :src="item.url" style="background-size: cover;height: 200px;width: fit-content;" @click="setBackground_url(item.url)">
                  
                  
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeMount,defineComponent, createApp } from 'vue';
import Head from './head/Index.vue'
import { useRoute, useRouter } from 'vue-router';
// const app = createApp({});
// app.component('Head', Head);
const route = useRoute(); // 获取当前路由信息

let exhibits= ref([
  {url:require("@/assets/imgs/1.png")},
  {url:require("@/assets/imgs/2.png")},
  {url:require("@/assets/imgs/3.png")},
  {url:require("@/assets/imgs/2.jpg")},
  {url:require("@/assets/imgs/3.jpg")},
  {url:require("@/assets/imgs/4.jpg")},
  {url:require("@/assets/imgs/5.jpg")},
  {url:require("@/assets/imgs/7.jpg")},
  {url:require("@/assets/imgs/8.jpg")},
  {url:require("@/assets/imgs/9.jpg")},
  {url:require('@/assets/imgs/fufubackground.jpg')}
]);
let background_url = ref(require('@/assets/imgs/fufubackground.jpg'));
function setBackground_url(url){
  background_url.value=url;
}
</script>

<style src="../../assets/css/layout.css" scoped>
</style>
