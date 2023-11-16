<!--
此文件为开发者工具生成，生成时间: 2023/11/8下午5:31:09
使用方法：
在 D:\Users\77244\Desktop\flshop\flshop\dist\dev\mp-weixin\pages\goods\goods.wxml 引入模板

```
<import src="goods.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 D:\Users\77244\Desktop\flshop\flshop\dist\dev\mp-weixin\pages\goods\goods.wxss 中引入样式
```
@import "./goods.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view class="sk-container">
    <scroll-view scroll-y="true" class="viewport" enable-back-to-top="true">
      <view class="goods">
        <view class="preview">
          <swiper circular="true" current="0" autoplay="false">
            <swiper-item
              style="
                position: absolute;
                width: 100%;
                height: 100%;
                transform: translate(0%, 0px) translateZ(0px);
              "
            >
              <image mode="aspectFill" class="sk-image"></image>
            </swiper-item>
          </swiper>
          <view class="indicator">
            <text class="current sk-transparent sk-opacity">1</text>
            <text class="split sk-transparent sk-opacity">/</text>
            <text class="total sk-transparent sk-opacity">5</text>
          </view>
        </view>
        <view class="meta">
          <view class="price">
            <text class="symbol sk-transparent sk-opacity">¥</text>
            <text class="number sk-transparent sk-text-14-2857-81 sk-text">79.00</text>
          </view>
          <view class="name ellipsis sk-transparent sk-text-14-2857-471 sk-text"
            >毛茸茸小熊出没，儿童羊羔绒背心73-90cm</view
          >
          <view class="desc sk-transparent sk-text-0-0000-307 sk-text"
            >连帽熊耳设计，萌化少女心app</view
          >
        </view>
        <view class="action">
          <view class="item arrow sk-pseudo sk-pseudo-circle">
            <text class="label sk-transparent sk-text-14-2857-842 sk-text">选择</text>
            <text class="text ellipsis sk-transparent sk-text-14-2857-168 sk-text">
              请选择商品规格
            </text>
          </view>
          <view class="item arrow sk-pseudo sk-pseudo-circle">
            <text class="label sk-transparent sk-text-14-2857-911 sk-text">送至</text>
            <text class="text ellipsis sk-transparent sk-text-14-2857-935 sk-text">
              请选择收获地址
            </text>
          </view>
          <view class="item arrow sk-pseudo sk-pseudo-circle"></view>
        </view>
      </view>
    </scroll-view>
    <view class="toolbar" style="padding-bottom: 0px">
      <view class="icons">
        <button class="icons-button sk-transparent sk-button sk-pseudo sk-pseudo-circle">
          <text class="icon-heart sk-pseudo sk-pseudo-circle"></text>收藏
        </button>
        <button
          class="icons-button sk-transparent sk-button sk-pseudo sk-pseudo-circle"
          open-type="contact"
        >
          <text class="icon-handset sk-pseudo sk-pseudo-circle"></text>客服
        </button>
        <navigator class="icons-button sk-transparent" open-type="switchTab">
          <text class="icon-cart sk-pseudo sk-pseudo-circle"></text>购物车
        </navigator>
      </view>
      <view class="buttons">
        <view
          class="addcart sk-transparent sk-text-31-9444-32 sk-text"
          style="background-position-x: 50%"
        >
          加入购物车
        </view>
        <view
          class="buynow sk-transparent sk-text-31-9444-612 sk-text"
          style="background-position-x: 50%"
        >
          立即购买
        </view>
      </view>
    </view>
  </view>
</template>
