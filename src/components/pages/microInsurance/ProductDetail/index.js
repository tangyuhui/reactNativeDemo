import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
           id:props.id||''
        }
    }
    render() {
        console.log(this.state.id)
        return (
            <View style={styles.container}>
                <Text>我是详情页</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    } 
 })