import HttpUtil from '@/util/httpUtil'
import {MICROINSURANCE} from './resources'

export default {
    /* 获取微信商品分类 */
  getProductCategory () {
    return HttpUtil.getRequest(MICROINSURANCE.GET_PRODUCT_CATEGORY)
  },
   /** 根据产品分类查询微信商品列表 */
  getProductByCateId ({ page = 1, size = 10, categoryId = '' }) {
    return HttpUtil.getRequest(MICROINSURANCE.GET_PRODUCT_BY_CATEID, { 
      categoryId: categoryId,
      page: page,
      size: size
    })
  },
   /**首页轮播图 */
   getCarouselImg(){
    return HttpUtil.getRequest(MICROINSURANCE.GET_CAROUSEL_IMG) 
  }
}
