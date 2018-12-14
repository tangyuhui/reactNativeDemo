import Index from '../components/pages/microInsurance/Index'
import ProDetail from '../components/pages/microInsurance/ProductDetail'
import {connectProps} from '#/util'
/**
 * 所有开发的页面都要在这里注册，否则跳转不了
 */
export default {
    Index:connectProps(Index),
    ProDetail:connectProps(ProDetail)
}