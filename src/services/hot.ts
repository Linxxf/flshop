import { http } from '@/utils/http'

export const getHotInfo = (url: string, data: any) => {
  return http({
    methods: 'GET',
    url,
    data,
  })
}
