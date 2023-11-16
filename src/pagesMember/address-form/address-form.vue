<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { postAddAddress, getAddressDetail, putAddressAmend } from '@/services/address'

let id = ref('')
let formRef = ref()

// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

nextTick(() => {
  uni.setNavigationBarTitle({ title: id.value ? '修改地址' : '新建地址' })
})

const getAddressDetailInfo = async () => {
  let res = await getAddressDetail(id.value)
  // console.log('收货地址详情',res);
  Object.assign(form.value, res.result)
}

//picker选择地区
const onRegionChange = (ev) => {
  // console.log('选择地区',ev.detail);
  //省市区 前端展示
  form.value.fullLocation = ev.detail.value.join(' ')
  //省市区 后端参数
  const [provinceCode, cityCode, countyCode] = ev.detail.code
  Object.assign(form.value, {
    provinceCode,
    cityCode,
    countyCode,
  })
}

//switch选择是否设置为默认地址
const onSwitchChange = (ev) => {
  // console.log('switch事件',ev.detail);
  form.value.isDefault = ev.detail.value ? 1 : 0
}

//提交表单
const onSubmit = async () => {
  // console.log(formRef.value);
  try {
    await formRef.value.validate()
    if (id.value) {
      let res = await putAddressAmend(id.value, form.value)
      console.log('修改表单', res)
    } else {
      let res = await postAddAddress(form.value)
      console.log('提交表单', res)
    }

    await uni.showToast({
      title: id.value ? '修改成功' : '提交成功',
      icon: 'success',
    })
    uni.navigateBack()
  } catch (error) {
    uni.showToast({
      icon: 'error',
      title: '请提交完整信息',
    })
  }
}

//表单校验规则
const rules = {
  // 收货人
  receiver: {
    rules: [{ required: true, errorMessage: '请输入收货人姓名' }],
  },
  // 手机号码
  contact: {
    rules: [
      { required: true, errorMessage: '请输入手机号码' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '请输入正确的手机号码' },
    ],
  },
  // 所在地区
  fullLocation: {
    rules: [{ required: true, errorMessage: '请选择所在地区' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '请输入详情地址' }],
  },
}

onLoad((options) => {
  // console.log(options);
  if (options.id) {
    id.value = options.id
    getAddressDetailInfo()
  }
})
</script>

<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item name="receiver" class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item name="contact" class="form-item">
        <text class="label">手机号码</text>
        <input
          class="input"
          placeholder="请填写收货人手机号码"
          :maxlength="11"
          v-model="form.contact"
        />
      </uni-forms-item>
      <uni-forms-item name="fullLocation" class="form-item">
        <text class="label">所在地区</text>
        <picker class="picker" @change="onRegionChange" mode="region" :value="form.fullLocation">
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item name="address" class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          color="#27ba9b"
          @change="onSwitchChange"
          :checked="form.isDefault === 1"
        />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button @tap="onSubmit" class="button">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    /* // 调整 uni-forms 样式 */
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
