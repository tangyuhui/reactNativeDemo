import React, {Component} from "react"
import {View} from "react-native"
 import {createStackNavigator, createAppContainer } from 'react-navigation';
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"
import {commonStyle} from '../util/commonStyle'
import PageManager from './PageManager';
// import { Provider } from "react-redux";
// import store from '#/store' 


const getSceneStyle = () => ({
    backgroundColor: "white",
    shadowOpacity: 1,
    shadowRadius: 3,
 })

 console.log(PageManager)
const RootStack  =createStackNavigator(
  PageManager,
  {
    initialRouteName: "Index",
    navigationOptions:{
      header:null
    }
  }
); 
console.log('----------->')
 console.log(RootStack)
// class App extends Component {
//     render() {
//       return  <Provider store={store}>
//                  <RootStack />
//               </Provider>
//     }
//  }
//<RootStack  screenProps={{themeColor:'red'}} />
class App extends Component {
      render() {
        return  <PageManager.Index />
      }
   }
   
  export default App