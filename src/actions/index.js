import {createAction} from 'redux-actions'
import actionTypes from '#/constants'

const getProductDetail = createAction(actionTypes.PRODUCT_DETAIL_GET,()=>{
    const productDetail = {
        name:'泰康呵护一生',
        price:100
    } 
    return productDetail
})

export default {
    getProductDetail
 };