<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`" v-for="item in goods" :key="item.goods_id" :price="item.goods_price | toFixed" :title="item.goods_name" :thumb="item.goods_small_logo || defaultPic"></van-card>
  </view>
</template>

<script>
  import {getGoodsListApi} from '@/api'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        queryData:{
          query:'',
          cid:'', //分类id
          pagenum:1, 
          pagesize:10
        },
        goods:[],
        total:0,
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isLoading:false
      };
    },
    methods:{
      async getGoodsList(stop){
        this.isLoading=true
        const res = await getGoodsListApi(this.queryData)
        console.log(res);
        this.isLoading = false
        this.goods = [...res.message.goods,...this.goods]
        this.total = res.message.total
        stop && stop()
      }
    },
    onLoad({query}){
      this.queryData.query = query
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
     this.queryData={
        query:this.queryData.query,
        cid:'', //分类id
        pagenum:1, 
        pagesize:10
      },
      this.total = 0
      this.goods = []
      // 2. 重新发起请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    onReachBottom(){
      if(this.isLoading) return  
      if(this.total===this.goods.length) {
        console.log(1);
        return toast.success('没有更多啦')
      }
      this.queryData.pagenum++
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">

</style>
