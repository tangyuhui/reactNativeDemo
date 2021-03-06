/**
 * Created by wangdi on 5/11/16.
 */
'use strict';

import {Dimensions} from 'react-native';

// device width/height
//const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
// design width/height
const uiHeightPx = 750;

export default function px2dp(uiElementPx) {
    //console.log(deviceWidthDp);
    //console.log(deviceHeightDp);
    return uiElementPx *  deviceHeightDp / uiHeightPx;
}
export const pageHeight = deviceHeightDp
export const pageWidth = deviceWidthDp