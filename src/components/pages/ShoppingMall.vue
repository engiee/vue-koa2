<template>
  <div>
    <!--搜索框布局-->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" placeholder="查找"/>
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--轮播图布局-->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="type-bar">
      <div  v-for="(cate,index) in category" :key="index" >
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        locationIcon: require('../../assets/images/location.png'),
        bannerPicArray:[
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
        ],
        category:[],
        adBanner:[]
      }
    },
    created(){
      axios({
        url: 'https://easy-mock.com/mock/5ae276d58e8556663763477a/vue-koa/',
        method: 'get',
      }).then(response => {
        console.log(response);
        if(response.status==200){
          this.category=response.data.data.category;
          this.adBanner = response.data.data.advertesPicture //获得广告图片
          this.bannerPicArray = response.data.data.slides   //轮播图片
        }
      }).catch((error) => {
      })
    }
  }
</script>

<style scoped>
  .search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height:2.2rem;
  }
  .search-input{
    width:100%;
    height: 1.3rem;
    border-top:0;
    border-left:0;
    border-right:0;
    border-bottom: 1px solid !important;
    background-color: #e5017d;
    color:#fff;
  }
  .location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
  }
  .swiper-area{
    width:100%;
    overflow: hidden;
  }
  .type-bar{
    background-color: #fff;
    margin:0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size:14px;
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
  }
  .type-bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
</style>
