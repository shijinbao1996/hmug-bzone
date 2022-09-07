import fly from '@/utils/request.js'
// 获取首页轮播图
export const getBannersApi = () => fly.get('/home/swiperdata')

/**
 * 获取分类数据
 * */
export const getNavListApi = () => fly.get('/home/catitems')

export const getFloorsApi = () => fly.get('/home/floordata')

