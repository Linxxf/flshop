<template name="skeleton">
  <view class="sk-container">
    <scroll-view refresher-enabled="true" scroll-y="true" class="scroll-wapper">
      <view is="components/flsSwiper">
        <view class="carousel flsSwiper--carousel">
          <swiper circular="true" interval="3000" current="0" autoplay="false">
            <swiper-item
              style="
                position: absolute;
                width: 100%;
                height: 100%;
                transform: translate(0%, 0px) translateZ(0px);
              "
            >
              <navigator class="navigator flsSwiper--navigator" hover-class="none">
                <image class="image flsSwiper--image sk-image" mode="aspectFill"></image>
              </navigator>
            </swiper-item>
          </swiper>
          <view class="indicator flsSwiper--indicator">
            <text class="dot flsSwiper--dot active flsSwiper--active"></text>
            <text class="dot flsSwiper--dot"></text>
            <text class="dot flsSwiper--dot"></text>
            <text class="dot flsSwiper--dot"></text>
            <text class="dot flsSwiper--dot"></text>
          </view>
        </view>
      </view>
      <view is="pages/index/components/CategoryPanel">
        <view class="category CategoryPanel--category">
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-939 sk-text"
              >居家</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-792 sk-text"
              >锦鲤</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-771 sk-text"
              >服饰</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-333 sk-text"
              >母婴</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-322 sk-text"
              >个护</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-596 sk-text"
              >严选</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-813 sk-text"
              >数码</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-295 sk-text"
              >运动</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-615 sk-text"
              >杂项</text
            >
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-915 sk-text"
              >品牌</text
            >
          </navigator>
        </view>
      </view>
      <view is="pages/index/components/HotPanel">
        <view class="panel HotPanel--panel hot HotPanel--hot">
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text
                class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-291 sk-text"
                >特惠推荐</text
              >
              <text
                class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-313 sk-text"
                >精选全攻略</text
              >
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text
                class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-80 sk-text"
                >爆款推荐</text
              >
              <text
                class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-384 sk-text"
                >最受欢迎</text
              >
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text
                class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-707 sk-text"
                >一站买全</text
              >
              <text
                class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-889 sk-text"
                >精心优选</text
              >
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text
                class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-591 sk-text"
                >新鲜好物</text
              >
              <text
                class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-658 sk-text"
                >生活加分项</text
              >
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
