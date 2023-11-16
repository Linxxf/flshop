<script setup lang="ts">
import { getProfileInfo, putMemberProfile } from '@/services/my'
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { useMemberStore, useLocationStore } from '@/stores/index'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const memberStore = useMemberStore()
const locationStore = useLocationStore()

//用户个人信息
let profileI = reactive({
  account: '',
  avatar: '',
  birthday: '',
  fullLocation: '',
  gender: '男',
  nickname: '',
  profession: '',
  provinceCode: '' || locationStore.locationCode.provinceCode,
  cityCode: '' || locationStore.locationCode.cityCode,
  countyCode: '' || locationStore.locationCode.countyCode,
})

//将请求的个人信息赋值
const profileIInfoGive = (res) => {
  profileI.account = res.account
  profileI.avatar = res.avatar
  profileI.birthday = res.birthday
  profileI.fullLocation = res.fullLocation
  profileI.gender = res.gender
  profileI.id = res.id
  profileI.nickname = res.nickname
  profileI.profession = res.profession
}

const profileInfo = async () => {
  let res = await getProfileInfo()
  // console.log('用户个人信息',res)
  profileIInfoGive(res.result)
}

//修改头像
const onAvatarchange = () => {
  //调用拍照/选择图片
  uni.chooseMedia({
    //可选数量
    count: 1,
    //文件类型
    meidaTyoe: ['image'],
    success: (res) => {
      // console.log('上传头像',res);
      const avatarPath = res.tempFiles[0].tempFilePath
      //不用写 method,文件上传接口默认为 POST
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file',
        filePath: avatarPath,
        success: (res) => {
          if (res.statusCode == 200) {
            const avatar = JSON.parse(res.data).result.avatar
            // console.log(avatar);
            profileI.avatar = avatar
            uni.showToast({
              title: '上传头像成功',
              icon: 'success',
              mask: true,
            })
          } else {
            uni.showToast({
              icon: 'fail',
              title: '上传头像失败',
            })
          }
        },
        fail: (error) => {},
      })
    },
  })
}

//改修性别
const onGenderAmend = (ev) => {
  // console.log('性别修改事件',ev);
  profileI.gender = ev.detail.value
  console.log(profileI)
}

//修改生日
const onDateAmend = (ev) => {
  // console.log(ev);
  profileI.birthday = ev.detail.value
}

//修改城市
const onFullLocationChaneg = (ev) => {
  profileI.fullLocation = ev.detail.value.join(' ')
  profileI.provinceCode = ev.detail.code[0]
  profileI.cityCode = ev.detail.code[1]
  profileI.countyCode = ev.detail.code[2]
  console.log('修改城市', ev.detail)
}

//保存提交信息
const commit = async () => {
  let res = await putMemberProfile(profileI)
  console.log('保存信息返回值', res)
  //存储头像信息和昵称
  memberStore.profile.avatar = res.result.avatar
  memberStore.profile.nickname = res.result.nickname
  //存储地址code
  locationStore.setLocationCode({
    provinceCode: profileI.provinceCode,
    cityCode: profileI.provinceCode,
    countyCode: profileI.cityCode,
  })
  await uni.showToast({
    icon: 'success',
    title: '保存成功',
  })
  uni.navigateBack()
}
onLoad(() => {
  profileInfo()
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar" @click="onAvatarchange">
      <view class="avatar-content">
        <image class="image" :src="profileI?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profileI.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="profileI.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderAmend">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profileI.gender == '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profileI.gender == '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profileI.birthday"
            @change="onDateAmend"
          >
            <view v-if="profileI.birthday">{{ profileI.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            @change="onFullLocationChaneg"
            class="picker"
            mode="region"
            :value="profileI.fullLocation.split(' ')"
          >
            <view v-if="profileI.fullLocation">{{ profileI.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profileI.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @click="commit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png); */
  background-color: #b18600;
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

/* // 导航栏 */
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/* // 头像 */
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

/* // 表单 */
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #b18600;
  }
}
</style>
