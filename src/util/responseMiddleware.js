import responseType from '@/constants/responseType'
export function filterBackendData (response) {
    if (response && response.data) {
      if (response.code === responseType.RESPONSE_SUCCESS) {
        return Promise.resolve(response.data)
      } else if (response.code === '201001') {
      //   router.push('/offline')
        return Promise.reject()
      } else if (response.code === '201009') {
          // 订单不存在
      //   router.push({path: '/emptyData', query: { errType: response.data.message }})
        return Promise.reject()
      } else if (response.code === '501009') {
          // 操作超时授权失效
      //   router.push({path: '/timeout', query: {errType: response.data.message}})
        return Promise.reject()
      } else if (response.code === '5010010') {
      //   router.push({path: '/otherError', query: { errType: response.data.message }})
        return Promise.reject()
      } else if (response.code === '5010011') {
      //   router.push({path: '/otherError', query: { errType: response.data.message }})
        return Promise.reject()
      } else if (Response.code === '601005' || response.code === '801002' || response.code === '201010' || response.code === '501019') {
      //   showToast(window.app, '授权失败，2秒后将跳到首页')
      //   setTimeout(() => { router.push('/index') }, 2000)
        /** 微信openId认证不通过 */
        return Promise.reject()
      } else {
        return Promise.reject(response.message)
      }
    } else {
      // router.push({path: '/otherError', query: {errType: '未知错误,请联系后台人员'}})
      return Promise.reject()
    }
  }