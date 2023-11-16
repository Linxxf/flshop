import { http } from '@/utils/http'

//添加收货地址
export const postAddAddress = (data: any) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

//获取收货地址收货列表
export const getAddressList = () => {
  return http({
    method: 'GET',
    url: '/member/address',
  })
}

//获取收货地址详情
export const getAddressDetail = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

//修改收货地址
export const putAddressAmend = (id: string, data: any) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}

//删除收货地址
export const deleteAddress = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
