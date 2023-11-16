// 添加拦截器:
//     拦截request请求
//     拦截uploadFile文件上传

import { useMemberStore } from '@/stores'

// TODO:
//     1.非http开头需要拼接地址
//     2.请求超时
//     3.添加小程序端请求头标识
//     4.添加token请求头标识

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

//添加拦截器
const httpInterceptor = {
  //拦截器触发
  invoke(options: any) {
    //1.非http开头需要拼接地址
    if (!options.url.startsWith('https')) {
      options.url = baseURL + options.url
    }
    //超时请求,默认60s
    options.timeout = 10000
    //添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    //添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    // console.log(options)
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 1.返回Promise对象
// 2.请求成功
//     2.1 提取核心数据 res.data
//     2.2 添加类型,支持泛型
// 3.请求失败
//     ...
export const http = (options: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      //响应成功
      success(res: any) {
        //提取核心数据
        //状态码2xx --> 成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else if (res.statusCode == 401) {
          //状态码401 --> 表示所请求的资源需要身份验证，但客户端没有提供有效的身份验证凭据
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          uni.showToast({
            icon: 'none',
            title: '请重新登录',
          })
          reject(res)
        } else {
          //其他错误
          uni.showToast({
            icon: 'none',
            title: res.data.msg || '请求错误',
          })
          reject(res)
        }
      },
      //响应失败 --> 用户网络问题
      fail(err: any) {
        uni.showToast({
          icon: 'none',
          title: '网络错误,请换个网络试试',
        })
        reject(err)
      },
    })
  })
}
