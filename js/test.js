import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

export default class FlexDimensionsBasics extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <View style={{flexDirection:"row"}}>
          <View style={{flex:1,height:300,backgroundColor:'powderblue'}}>
          </View>
          <View style={{flex:1,height:300,paddingBottom:200,backgroundColor:'red'}}>
          </View>
      </View>
  
    );
  }
}