import React, { Component } from "react";
import { wx_login } from "@/api/login";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { setStore, getStore } from "@/utils/utils";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    userInfo: {
      nickName: null,
      avatarUrl: ""
    }
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getUserInfo = e => {
    //每次操作记录一次时间点
    const _this = this;
    const token = getStore("userToken");
    if (token) {
      return;
    }
    console.log(this.state.userInfo);
    
    const nowTime = new Date().getTime();
    setStore("getUserInfo_time", nowTime);
    if (e.detail.userInfo) {
      wx_login(e).then(() => {
        console.log("wxuser", e.detail.userInfo);
        const { avatarUrl, gender, nickName } = e.detail.userInfo;
        this.setState(
          {
            userInfo: {
              avatarUrl,
              nickName
            }
          },
          () => {
            Taro.navigateTo({
              url: "/pages/public/index"
            });
          }
        );
      });
    } else {
      this.clearUserInfo();
    }
  };

  clearUserInfo = () => {
    const nowTime = new Date().getTime();
    console.info("清除了用户存储");
    // removeStore("userInfo");
    // removeStore("userToken");
    // setStore("getUserInfo_time", nowTime);
  };

  render() {
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
      </View>
    );
  }
}
