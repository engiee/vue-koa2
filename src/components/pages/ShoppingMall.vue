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

    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">

        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">

              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice}})</div>

            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <!--floor one area-->
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <!--Hot Area-->
        <div class="hot-area">
          <div class="hot-title">热卖商品</div>
          <div class="hot-goods">
            <!--这里需要一个list组件-->
            <van-list>
              <van-row gutter="20">
                <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                  <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                </van-col>
              </van-row>
            </van-list>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import 'swiper/dist/css/swiper.css'

  import swiperDefault from '../swiper/swiperDefault'

  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import floorComponent from '../component/floorComponent'
  import goodsInfo from '../component/goodsInfoComponent'

  import {toMoney} from '@/filter/moneyFilter.js'
  export default {
    components: {
      swiper,
      swiperSlide,
      swiperDefault,
      floorComponent,
      goodsInfo
    },
    filters:{
      moneyFilter(money){
        return toMoney(money)
      }
    },
    data() {
      return {
        locationIcon: require('../../assets/images/location.png'),
        bannerPicArray:[
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'}
        ],
        category:[],
        adBanner:[],
        recommendGoods:[],
        swiperOption:{
          pagination:{
            el:'.swiper-pagination'
          }
        },
        floor1_0:'',
        floor1_1:'',
        floor1_2:'',
        floor1:[],
        floor2:[],         //楼层1的数据
        floor3:[],         //楼层1的数据
        floorName:'',
        hotGoods:[] //热卖商品
//        swiperOption: {
//          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
//          debugger: true,
//          autoplay: 3000,
//          slidesPerView: "auto",//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
//          centeredSlides: true//<span style="color:rgb(68,68,68);font-family:'microsoft yahei';font-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>
//        }
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
          this.recommendGoods = response.data.data.recommend  //推荐商品
          this.floor1_0 =this.floor1[0];
          this.floor1_1 =this.floor1[1];
          this.floor1_2 =this.floor1[2];
          this.floor1 = response.data.data.floor1;             //楼层1数据
          this.floor2 = response.data.data.floor2;             //楼层2数据
          this.floor3 = response.data.data.floor3;             //楼层3数据
          this.floorName = response.data.data.floorName;       //楼层名称
          this.hotGoods = response.data.data.hotGoods           //热卖商品
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
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    color:#e5017d;
  }
  .recommend-body{
    border-bottom: 1px solid #eee;
  }

  .recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
  }
</style>
