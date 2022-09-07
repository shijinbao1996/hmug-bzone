import fly from '@/utils/request.js';
// 获取首页轮播图
export const getGoodsListApi = (data) => fly.get('/goods/search',data)