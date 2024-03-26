<template>
	<div class="cover"></div>

	<div class="body">
		
		<div class="container">
			
			<div class="head">
				<Head></Head>
			</div>

			<div class="main">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>


<script>
import { defineComponent, ref } from 'vue';
import Head from '../layout/head/Index.vue'
import {startSakura} from '@/js/fullScreenFlower'
export default defineComponent({
  components:{
    Head
  },
  data(){
    return{
      showMenu:false
    }
		
  },
	mounted() {
		startSakura()
	},
});
</script>

<style src="../../assets/css/layout.css" scoped>

</style>
