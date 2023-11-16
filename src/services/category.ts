import { http } from '@/utils/http'

export const getCategoryInfo = () => {
  return http({
    methods: 'GET',
    url: '/category/top',
  })
}
