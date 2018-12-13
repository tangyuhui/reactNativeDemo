import React, {Component} from "react"
import {View} from "react-native"
 import { StackViewStyleInterpolator } from 'react-navigation-stack';
 import {createStackNavigator, createAppContainer } from 'react-navigation';
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"
import {commonStyle} from '../util/commonStyle'
// import Index from '../components/pages/microInsurance/Index'
// import ProDetail from '../components/pages/microInsurance/ProductDetail'
import PageManager from './PageManager';
const getSceneStyle = () => ({
    backgroundColor: "white",
    shadowOpacity: 1,
    shadowRadius: 3,
 })
 const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forHorizontal,
});
 
//  const scenes = Actions.create(
//    <Scene key="root">
//     <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
//         <Lightbox key="lightbox" hideNavBar={true}>
//               <Stack key="init" back>
//                   <Scene key="index"  hideNavBar component={Index} title="首页" />   
//                   <Scene key="proDetail"  component={ProDetail} title="详情页" />
//               </Stack>
//         </Lightbox>
//      </Modal>
//    </Scene>
//  )
console.log(PageManager)
const RootStack  =createStackNavigator(
  PageManager,
  {
    initialRouteName: "Index"
  }
); 
 
class App extends Component {
    render() {
      return <RootStack />;
    }
 }
 const initApp = () => {
    return (
        <App/>
    )
  }
  
  export default initApp