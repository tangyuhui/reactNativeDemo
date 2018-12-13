import React, {Component} from "react"
import {View} from "react-native"
//  import { StackViewStyleInterpolator } from 'react-navigation-stack';
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"
import {commonStyle} from '../util/commonStyle'
import Index from '../components/pages/microInsurance/Index'
import ProDetail from '../components/pages/microInsurance/ProductDetail'

const getSceneStyle = () => ({
    backgroundColor: "white",
    shadowOpacity: 1,
    shadowRadius: 3,
 })
//  const transitionConfig = () => ({
//   screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
// });

 const scenes = Actions.create(
   <Scene key="root">
    <Modal key="modal" hideNavBar>
        <Lightbox key="lightbox" hideNavBar={true}>
              <Stack key="init" back>
                  <Scene key="index"  hideNavBar component={Index} title="首页" />   
                  <Scene key="proDetail"  component={ProDetail} title="详情页" />
              </Stack>
        </Lightbox>
     </Modal>
   </Scene>
 )
class App extends Component {
    render() {
      return (
        <View style={{flex: 1}}>
          <Router
            scenes={scenes}
            tintColor='white'
            getSceneStyle={getSceneStyle}
          />
        </View>
      )
    }
 }
 const initApp = () => {
    return (
        <App/>
    )
  }
  
  export default initApp