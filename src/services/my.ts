import { http } from '@/utils/http'
import { useMemberStore } from '@/stores/index'

const memberStore = useMemberStore()

//获取个人信息
export const getProfileInfo = () => {
  return http({
    method: 'GET',
    url: '/member/profile',
    data: {
      Authorization: memberStore.profile.token,
    },
  })
}

//修改个人信息
export const putMemberProfile = (data: any) => {
  return http({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
