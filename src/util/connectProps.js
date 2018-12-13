import * as React from "react";

/**
 * 包装Component，让它navigation的参数都能够以this.props.{参数名称}来访问
 * @param WrappedComponent
 * @returns {PropsComponent}
 */
export default (WrappedComponent)=>{

    class PropsComponent extends React.PureComponent{
        static navigationOptions = WrappedComponent.navigationOptions
        constructor(props){
            super(props)
            this.extraProps={};
            this.screenProps={};
            if(this.props.navigation&&this.props.navigation.state&&this.props.navigation.state.params){
                this.extraProps=this.props.navigation.state.params;
            }
            if(this.props.screenProps){
                this.screenProps=this.props.screenProps;
            }
        }
        render(){
            let {navigation}=this.props;
            return (<WrappedComponent navigation={navigation} {...this.extraProps} {...this.screenProps}/>)
        }
    }
    return PropsComponent
}