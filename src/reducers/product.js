import {handleActions} from 'redux-actions'
import actionTypes from '#/constants/actionType'

const initialState = {
    productDetail: { 
        name:'安心住院宝',
        price:30
    }
};
const productReducer = handleActions({
    [actionTypes.PRODUCT_DETAIL_GET]: (state, action) => {
      return {
        ...state,
        productDetail: action.productDetail,
      }
    } 
  }, initialState);

export default productReducer 