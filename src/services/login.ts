import { http } from '@/utils/http'

//该接口对个人开发者不开放(请求会收费)
// export const postWXLogin = (data:any) => {
//     return http({
//         methods:'POST',
//         url:'/login/wxMin',
//         data
//     })
// }

//登录接口,测试班
export const postWXLogin = (phoneNumber: string) => {
  return http({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
