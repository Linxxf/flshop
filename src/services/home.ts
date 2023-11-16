import { http } from '@/utils/http.ts'

//首页广告轮播图
export const getBannerInfo = (distributionSite: any) => {
  return http({
    methods: 'GET',
    url: '/home/banner',
    data: {
      distributionSite: distributionSite,
    },
  })
}

//首页前台分类
export const getCategoryPanel = () => {
  return http({
    methods: 'GET',
    url: '/home/category/mutli',
  })
}

//首页热门推荐
export const getHotPanel = () => {
  return http({
    methods: 'GET',
    url: '/home/hot/mutli',
  })
}

//首页猜你喜欢
export const getGuess = (page = 1, pageSize = 10) => {
  return http({
    methods: 'GET',
    url: '/home/goods/guessLike',
    data: {
      page,
      pageSize,
    },
  })
}
