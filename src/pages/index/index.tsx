import React, { Component } from "react";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

export default class Index extends Component {
  state: StateType = {
    client: "driver"
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  renderName = (name)=>{
   return name==='driver'?'司机':'收货端'
  }

  render() {
    const {client} = this.state
    return (
      <View className='index'>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
    <View>{this.renderName(client)}</View>
      </View>
    );
  }
}
