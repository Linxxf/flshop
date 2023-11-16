import { http } from '@/utils/http'

export const getGoodsInfo = (id: string) => {
  return http({
    methods: 'GET',
    url: '/goods',
    data: {
      id: id,
    },
  })
}
