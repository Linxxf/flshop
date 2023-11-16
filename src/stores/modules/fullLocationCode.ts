import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useLocationStore = defineStore(
  'fullLocationCode',
  () => {
    // 会员信息
    const locationCode = ref<any>()

    // 保存地址信息,点击保存个人信息时使用
    const setLocationCode = (val: any) => {
      locationCode.value = val
    }

    // 清理会员信息，退出时使用
    const clearLocationCode = () => {
      locationCode.value = undefined
    }

    // 记得 return
    return {
      locationCode,
      setLocationCode,
      clearLocationCode,
    }
  },
  // TODO: 持久化
  {
    //pc端持久化
    // persist: true,
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
