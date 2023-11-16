<script setup lang="ts">
import CustomNavBar from './components/CustomNavBar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeletion from './components/PageSkeletion.vue'

import { ref } from 'vue'
import { getBannerInfo, getCategoryPanel, getHotPanel, getGuess } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'

//轮播图
let banner = ref([])
//前台分类
let categoryPanel = ref([])
//热门推荐
let hotPanel = ref([])
//猜你喜欢
let guess = ref([])
//猜你喜欢 page 页数
let page = ref(30)
//猜你喜欢数据页总数
let pageCounts = ref(0)
//更多加载....  显示与隐藏
let flag = ref(true)
//刷新....  显示与隐藏
let refresh = ref(false)

const bannerInfo = async () => {
  let res = await getBannerInfo(1)
  banner.value = res.result
  // console.log('轮播图数据',res);
}
const categoryPanelInfo = async () => {
  let res = await getCategoryPanel()
  categoryPanel.value = res.result
  // console.log('前台分类',res);
}

const hotPanelInfo = async () => {
  let res = await getHotPanel()
  hotPanel.value = res.result
  // console.log('热门推荐',res);
}

const guessInfo = async () => {
  let res = await getGuess(page.value)
  // console.log('猜你喜欢',res);
  guess.value.push(...res.result.items)
  pageCounts.value = res.result.pages
}

//滚动容器滚动触底事件
const touchBottom = () => {
  page.value++
  if (page.value < pageCounts.value) {
    guessInfo()
  } else {
    flag.value = false
    uni.showToast({
      title: '已经没有更多数据了~',
      icon: 'none',
    })
  }
  // console.log(page.value);
}

//自定义下拉刷新监听事件
const onRefresherrefresh = async () => {
  //开启加载动画
  refresh.value = true
  //异步中 --> 单线程执行,性能较差
  // await bannerInfo()
  // await categoryPanelInfo()
  // await hotPanelInfo()
  // await guessInfo()
  //重置猜你喜欢数据
  page.value = 30
  pageCounts.value = 0
  flag.value = true
  guess.value = []
  await Promise.allSettled([bannerInfo(), categoryPanelInfo(), hotPanelInfo(), guessInfo()])
  //关闭加载动画
  refresh.value = false
}

//页面是否在加载中...
let isLoading = ref(true)

onLoad(async () => {
  isLoading.value = true
  await Promise.allSettled([bannerInfo(), categoryPanelInfo(), hotPanelInfo(), guessInfo()])
  isLoading.value = false
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavBar />
  <scroll-view
    refresher-enabled
    :refresher-triggered="refresh"
    @refresherrefresh="onRefresherrefresh"
    scroll-y
    class="scroll-wapper"
    @scrolltolower="touchBottom"
  >
    <!-- 骨架屏 -->
    <PageSkeletion v-if="isLoading" />
    <view v-else>
      <!-- 自定义轮播图 -->
      <flsSwiper :banner="banner" />
      <!-- 自定义前台类目布局 -->
      <CategoryPanel :categoryPanel="categoryPanel" />
      <!-- 自定义热门推荐 -->
      <HotPanel :hotPanel="hotPanel" />
      <!-- 自定义猜你喜欢 -->
      <flsGuess :guess="guess" :flag="flag" />
    </view>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-wapper {
  flex-grow: 1;
}
</style>
