<!-- // /src/pages/hot/hot.vue -->
<script setup lang="ts">
// 热门推荐页 标题和url
import { onLoad } from '@dcloudio/uni-app'
import { getHotInfo } from '@/services/hot'
import { ref, reactive } from 'vue'
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
//热门推荐类型  --  链接
let type = ref(0)
let url = ref('')
//横幅图片
let bannerPicture = ref('')
//推荐类型
let subTypes = ref([])
//推荐类型点击高亮
let active = ref(0)

const hotInfo = async () => {
  let res = await getHotInfo(url.value)
  bannerPicture.value = res.result.bannerPicture
  subTypes.value = res.result.subTypes
  console.log('热门推荐信息', res)
}

//高亮切换
const activeChange = (index) => {
  active.value = index
}

//scroll-view 滚动触底事件
const touchBottom = async (pages, index) => {
  // console.log('滚动触底', pages);
  subTypes.value[index].goodsItems.page++
  console.log(subTypes.value[index].goodsItems.page)
  // console.log(subTypes.value);
  if (subTypes.value[index].goodsItems.page <= pages) {
    let res = await getHotInfo(url.value, {
      subType: subTypes.value[index].id,
      pageSize: subTypes.value[index].goodsItems.pageSize,
      page: subTypes.value[index].goodsItems.page,
    })
    // console.log(res);
    subTypes.value[index].goodsItems.items.push(...res.result.subTypes[index].goodsItems.items)
  } else {
    uni.showToast({
      title: '没有更多信息了~',
    })
  }
}

onLoad((options) => {
  // console.log(options.type);
  type.value = options.type
  let res = hotMap.find((item) => item.type == type.value)
  url.value = res.url
  // console.log(res);
  uni.setNavigationBarTitle({ title: res.title })

  hotInfo()
})
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        :class="{ active: active == index }"
        class="text"
        v-for="(item, index) in subTypes"
        @click="activeChange(index)"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      scroll-y
      class="scroll-view"
      v-for="(item, index) in subTypes"
      :key="item.id"
      v-show="active == index"
      @scrolltolower="touchBottom(item.goodsItems.pages, index)"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="good in item.goodsItems?.items"
          :key="good.id"
          :url="`/pages/goods/goods?id=${good.id}`"
        >
          <image class="thumb" :src="good.picture"></image>
          <view class="name ellipsis">{{ good.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ good.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text" v-if="item.goodsItems.page <= item.goodsItems.pages"
        >正在加载...</view
      >
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}

.scroll-view {
  flex: 1;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;

  .text {
    margin: 0 20rpx;
    position: relative;
  }

  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #b18600;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;

  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    height: 88rpx;
    font-size: 26rpx;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .symbol {
    font-size: 70%;
  }

  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
