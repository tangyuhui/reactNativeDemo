import {API_URL} from '#/constants/urlConfig'
export function merge (url) {
  return `${API_URL}/api/wx/v1/${url}`
}
export const MICROINSURANCE = {
  GET_PRODUCT_CATEGORY: merge('product/category'), // 获取产品分类
  GET_PRODUCT_BY_CATEID: merge('product'), // 根据产品分类获取产品列表
  GET_CAROUSEL_IMG:merge('home/image'), //首页轮播图
  GET_PRODUCT_DETAIL: 'product/{id}', // 产品详情
  GET_PRODUCT_PLAN: 'product/{id}/plan', // 获取产品计划
  GET_PRODUCT_PRICE_FACTOR: 'product/plan/{id}/price/factor', // 根据计划id拿到它的价格因素
  GET_PRODUCT_PRICE: 'product/plan/{id}/price',
  FAKE_AUTHENTICATE: 'faker/api/authenticate',
  INDEX_AUTH: 'indexAuth',
  GET_USER: 'center/user', // 获取微信用户信息
  PLAN_SELECTOR_OPTION: 'product/plan/{id}/setting', // 订单页的下拉框选项
  GET_OCCUPLCATEGORY: 'product/{id}/setting/occuplCategory', // 获取保险公司职业
  GET_REGION: 'company/{id}/setting/region', // 获取保险公司地区
  GET_INPUT_INSUREFORM: 'product/{id}/insureForm', // 查询投保信息录入表单
  GET_ORDER_TOKEN: 'order/token', // 得到订单token
  SAVE_ORDER: 'order', // 保存订单
  GET_ORDER: 'order/{id}', // 查询订单信息(订单确认页面)
  GET_USER_CENTER_ORDER: 'center/user/order/{id}', // 用户中心查询订单详情
  USERBIND: 'center/user/bind',  // 小额保险登录绑定
  HTML_to_IMAGE: 'center/html2image', // html转成图片
  GET_QR_CODE: 'center/qrcode', // 获取二维码
  GET_ORDER_LIST: 'center/user/order', // 获取订单列表
  DELETE_ORDER: 'center/user/order/{id}', // 删除订单
  GET_POLICY_LIST: 'center/user/policy', // 获取保单列表
  GET_USER_IMG: 'center/user/image', // 获取用户头像(二维码界面跨域)
  REFRESH_ORDER_STATUS: 'center/user/order', // 更新用户微信订单与泛华同步
  GET_COMMISSION: 'center/user/commission', // 得到提成
  GET_COMMISSION_OVERVIEW: 'center/user/home', // 获取微信用户中心统计信息
  COLLECTION_URL: 'center/user/collection', // 收藏接口地址
  GET_COLLECT_FLAG_BY_ID: 'center/user/collection/product', // 查询用户产品是否收藏
  USER_SETTING: 'center/user/setting', // 修改微信用户配置信息
  GET_PLAN_COMMISSION: 'product/{id}/commission', // 查询产品所有计划及提成
  GET_SECURITY_PUBKEY: 'security/pubKey', // 得到公钥
  GET_CAN_CLAIM_LIST:'center/user/claim', //得到可以理赔订单列表
  POST_CLAIM :'center/user/claim', //提交理赔
  GET_CLAIM_DETAIL:'center/user/claim/{id}',// 得到理赔详情
  GET_INSCOMPANY_MOBILE:'company/mobile', //得到保险公司电话
  ORC_IDCARD:'orc/idcard',//身份证照片识别
  MY_INS_CUSTOMER:'center/user/customer/insur', //查询我的保险客户
  MY_XD_CUSTOMER:'center/user/customer/xindai', //查询我的信贷客户
  CUSTOMER_MSG_BASE:'center/user/customer/{customerId}/base', //查询客户基础信息
  CUSTOMER_MSG_RELATIONSHIP:'center/user/customer/{customerId}/relationship', //查询客户关系信息
  CUSTOMER_MSG_PROPERTY:"center/user/customer/{customerId}/property", //查询客户资产信息
  CUSTOMER_MSG_POLICY:"center/user/customer/{customerId}/policy", //查询客户保单信息
  GET_PRODUCT_POSTER:'product/{id}/poster', //查询微信产品海报详情
  GET_HOT_OCCUPL:'product/{productId}/setting/occuplCategory/hot', //得到热门搜索职业
  GET_WX_USER_ACCOUNT:'center/user/account', //获取当前微信用户支持的全部工号信息
  SWITCH_USER:'center/user/switch/{userId}', //微信用户切换
  GET_RENEW_LISt:'center/user/renew' //查询用户续保订单列表
}
