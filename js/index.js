import React, { Component } from 'react';
import {deviceInfo,filterBackendData,Toast} from './util' 
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import api from  '@/api/microInsurance'
import Images from '@/resources/Images'
import _ from 'lodash'
import {    
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Button
   } from 'react-native';
import Swiper from 'react-native-swiper';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId:'',
      navItems:['少儿','老人','健康','意外','全部'],
      category: ['ALL', 'LY', 'SR', 'LR', 'JK', 'YW', 'RX'],
      refreshState: RefreshState.Idle,
      dataList:[],
      total:0,
      hasError:false,
      tabbarList:[],
      swiperList:[]
    };
    this.page = 1
    this.size = 10
    this._flatList=React.createRef()
  }
  componentDidMount(){
    this.getSwiper()
    this.getProductCategory().then(()=>{
      this.onHeaderRefresh()
    })
  }
  async getProductList(isReload){
    //重载
    if(isReload){
       this.page =1
    }else if(!this.state.hasError){
       this.page++
    }
    try {
      let data =  await api.getProductByCateId({page: this.page,size:this.size,categoryId:this.state.categoryId}).then(filterBackendData)
      this.setState({
        total:data.total,
        hasError:false
      })
      return data.list
    } catch (error) {
      this.setState({
        hasError:true,
        refreshState:RefreshState.Failure
      })
      return Promise.reject(error)
    }
  }
  async getProductCategory () {
    let self = this
    try {
      let res = await api.getProductCategory().then(filterBackendData)
      console.log(res)
      res.push({
        name: '全部',
        type: 'productType',
        code: 'ALL'
      })
      /** 确保数据是对的，有图标存在才显示 */
      let tabbarList = res.filter(function (item) {
        if (self.state.category.indexOf(item.code) !== -1) {
          return item
        }
      })
      /** 手动排序：将热销调到第一位 */
      let hotIndex = _.findIndex(tabbarList, {'code': 'RX'})
      /** 找不到，那就算了，找到了，就要将它放在第一位,并且要将热销的id改为后台指定的一个值,跟别的处理方式不一样 */
      if (hotIndex !== -1) {
        tabbarList[hotIndex].id = 'hot';
        [tabbarList[0], tabbarList[hotIndex]] = [tabbarList[hotIndex],tabbarList[0]]
      }
      this.setState({
        categoryId:tabbarList[0].id,
        tabbarList:tabbarList
      })
      
    } catch (error) {
      Toast.showError(error)
    }
  }
  async getSwiper(){
    try {
     let res = await api.getCarouselImg().then(filterBackendData)
    if (Array.isArray(res)) {
        res = res.filter(item => item.enabledFlag === true)
        res.map((item) => {
          item.img = item.code
          item.url = item.value
        })
        this.setState({
          swiperList:res
        })
      }
    } catch (error) {
      Toast.showError(error)
    }
   
  }
  _keyExtractor = (item, index) => index.toString();
  renderNav(){
    let navList = null
    let tabbarList = this.state.tabbarList
    if(tabbarList &&  tabbarList.length>0){
      navList =  tabbarList.map((item,index)=>{
        return (
          <View style={styles.navItem} key={index}>
           <TouchableWithoutFeedback  onPress={()=>this.handleClick(item.id)} >
            <View style={styles.navItemTouch}>
              <Image style={styles.navImage} source={Images.index.navImages[item.code]} resizeMode="stretch"/>
              <Text style={styles.navTxt}>{item.name}</Text>
            </View>
            </TouchableWithoutFeedback>
            {
              this.renderBar(item.id)    
            }
         </View>
     
        )
      })
    }
    return   <View style={styles.navContainer}>{navList}</View>
  }
  renderBar(curItemId){
    if(curItemId ===this.state.categoryId){
         return <View style={styles.navHighlight}></View>
    }else{
          return null
    }
  }
  handleClick(index){
    let flatlist = this._flatList.current
    if(this.state.dataList&&this.state.dataList.length>0){
      flatlist.scrollToIndex({index:0});
    }
    this.setState({categoryId:index },()=>{
      this.onHeaderRefresh()
    });
 
  }
  sepa() {
    return (<View style={{height:StyleSheet.hairlineWidth,backgroundColor:'#E5E5E5'}}></View>)
  }
  proRefresh(){
    this.setState({
      isRefreshing:true
    })  
  }
  renderCell=({item}) => (
    <View style={styles.proItem}>
      <Image  style={styles.proItemImg}   source={{uri:item.thumbnailImageUrl}} />
      <View style={styles.proItemContent}>
         <View>
            <Text style={styles.proName} ellipsizeMode='tail' numberOfLines={1}>{item.productName}</Text>
            <Text style={styles.proDesc} ellipsizeMode='tail' numberOfLines={2}>{item.productFeature}</Text>
         </View>
         <View>
            <Text style={styles.proPrice}>{item.minAmount}元/起</Text>
         </View>
      </View>
    </View>
  )
  onHeaderRefresh= async ()=>{
    try {
      this.setState({ refreshState: RefreshState.HeaderRefreshing })
      //获取产品数据
      let dataList = await this.getProductList(true)
      let refreshState=this.calPageStatus(dataList)
      this.setState({
          dataList: dataList,
          refreshState: refreshState
      })
    } catch (error) {
      Toast.showError(error)
    }
  
  }
  onFooterRefresh=async ()=>{
    try {
      this.setState({ refreshState: RefreshState.FooterRefreshing })
      let newList  = await this.getProductList(false)
      let self = this
      this.setState((prevState, props)=>{
        let newDataList =  [...prevState.dataList, ...newList]
          return  {
              dataList: newDataList,
              refreshState:this.calPageStatus(newDataList),
          }
       } 
      )
    } catch (error) {
    
    }
  }
  calPageStatus(dataList){
    if(dataList.length < 1){
       return RefreshState.EmptyData
    }else if(dataList.length>=this.state.total){
       return RefreshState.NoMoreData
    }else{
       return RefreshState.Idle
    }
  }
  renderEmptyArea(){
    return <View style={{paddingBottom:20,paddingTop:20}}><Text style={{color:'#999',textAlign:'center'}}>暂无数据</Text></View>
  }
  renderSwiper(){
    const swiperList = this.state.swiperList 
    if(swiperList && swiperList.length>0){
     const slides = swiperList.map((slide)=>{
       return (
        <View style={styles.slide} key={slide.img}>
         <Image style={styles.slideImage} source={slide.url} resizeMode="stretch"/>
        </View>
       )
     })
      return (
       <View style={styles.swiperWrap}>
        <Swiper style={styles.wrapper}  showsButtons={true} buttonWrapperStyle={ {background:'red',color:'red'}}>
          {slides}
        </Swiper>
       </View>
      )
    }else {
      return null
    }
  }
  render() {
    return (
      <View style={styles.container}>
           {this.renderSwiper()}
           {this.renderNav()}
        <View style={styles.proList}>
           <RefreshListView
              //使用 ref 可以获取到相应的组件
              listRef={this._flatList}
              data={this.state.dataList}
              ItemSeparatorComponent={this.sepa}  
              keyExtractor ={this._keyExtractor} 
              renderItem={this.renderCell}
              ListEmptyComponent={this.renderEmptyArea}
              refreshState={this.state.refreshState}
              onHeaderRefresh={this.onHeaderRefresh}
              onFooterRefresh={this.onFooterRefresh}
              getItemLayout={(data, index) => ( {length: 106, offset: (106 + StyleSheet.hairlineWidth) * index, index} )}
                 // 可选
              footerRefreshingText='玩命加载中 >.<'
              footerFailureText='我擦嘞，居然失败了 =.=!'
              footerNoMoreDataText='-我是有底线的-'
              footerEmptyDataText='-好像什么东西都没有-'
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height:deviceInfo.deviceHeight
  },
  swiperWrap:{
    width:deviceInfo.deviceWidth,
    height: 160
  }, 
  wrapper: {
  
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage:{
    width:deviceInfo.deviceWidth,
    height: 160
  },
  navImage:{
    width:23,
    height:23
  },
  navContainer:{
    flexDirection:'row',
    backgroundColor:'#fff',
    paddingLeft:10,
    paddingRight:10
  },
  navItem:{
     flex:1,
     paddingTop:10,
     paddingBottom:10,
     justifyContent:'center',
     alignItems: 'center',
     flexDirection:'row'
  },
  navItemTouch:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  },
  navTxt:{
    marginTop:2,
    fontSize:12
  },
  navHighlight:{
       left:0,
       right:0,
       position:'absolute',
       bottom:0,
       height:3,
       backgroundColor:'#444'
  },
  navText:{

  },
  proList:{
      marginTop:10,
      borderTopColor: '#E5E5E5',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E5E5E5',
      borderBottomWidth: StyleSheet.hairlineWidth,
      backgroundColor:'#fff',
      paddingBottom:30,
      flex:1
  },
  proItem:{
    paddingTop:5,
    paddingBottom:5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'stretch'
  },
  proItemImg:{
    width:96,
    height:96,
    marginRight:5
  },
  proItemContent:{
    flex:1,
    justifyContent:'space-around'
  },
  proName:{
      fontSize:14,
      fontWeight:'bold'
  },
  proDesc:{
      fontSize:13,
      color:'#999'
  },
  proPrice:{
     textAlign:'right',
     color:'#EB0D0B',
     fontSize:15,
     fontWeight:'bold',
     marginRight:10
  }

})