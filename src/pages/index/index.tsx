/*
 * @Author: zyj
 * @Date: 2020-09-03 15:09:43
 * @LastEditors: zyj
 * @LastEditTime: 2021-02-03 15:32:51
 * @Description: file content
 * @FilePath: /factorynike-mini/src/pages/index/index.tsx
 */
import React, { Component } from "react";
import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtButton, AtAvatar, AtCard, AtGrid,AtIcon } from "taro-ui";
import Taro from '@tarojs/taro'
import shangbao from '@/assets/image/shangbao.png'
import ths from '@/assets/image/ths.png'
import tihuo from '@/assets/image/tihuo.png'
import yunshu from '@/assets/image/yunshu.png'
import bannerImg from '@/assets/image/banner.png'

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

export default class Index extends Component {
  state: StateType = {
    client: "driver",
    navData: [
      {
        image: yunshu,
        value: "运输任务"
      },
      {
        image:shangbao,
        value: "在途上报"
      },
      {
        image:tihuo,
        value: "强制提货"
      },
      {
        image:ths,
        value: "TAD"
      }
    ]
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  renderName = name => {
    return name === "driver" ? "TMS司机端" : "收货端";
  };
  handleIconClick = ()=>{
    console.log(123)
    Taro.navigateTo({
      url: "/pages/mine/index"
    });
  }

  render() {
    const { client, navData } = this.state;
    return (
      <View className="index">
        <View className="header">
        {/* <AtAvatar
          className="marginSpace"
          circle
          image={logo}
          // size="small"
        ></AtAvatar> */}
        {/* <AtAvatar
          className="marginSpace"
          circle
          text="我的"
          size="small"
        ></AtAvatar> */}
        <View style={'width:40px'}></View>
        <View className="clientName">{this.renderName(client)}</View>
        <AtIcon value='user' size='30' color='#fff' onClick={()=>this.handleIconClick()}></AtIcon>
        </View>
        <View className="cardBanner">
        <Swiper
            className="test-h"
            indicatorColor="#999"
            indicatorActiveColor="#333"
            circular
            indicatorDots
            autoplay
          >
            <SwiperItem>
              <View className="bannerItem">
                <Image
                  mode="aspectFill"
                  src={bannerImg}
                ></Image>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className="bannerItem">
                <Image
                  mode="aspectFill"
                  src={bannerImg}
                ></Image>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className="bannerItem">
                <Image
                  mode="aspectFill"
                  src={bannerImg}
                ></Image>
              </View>
            </SwiperItem>
          </Swiper>
        </View>


        {/* <View>{this.renderName(client)}</View> */}
        <View className="grid">
          {/* <AtGrid hasBorder={false} columnNum={4} data={navData} /> */}
          <View className="navContent">
            {
              navData.map(item=>(
                <View className="navItem">
                  <Image mode="aspectFit" src={item.image}></Image>
                  <View className="navVal">{item.value}</View>
                </View>
              ))
            }
           
          </View>
        </View>
        {/* <View>
          <View className="content">
            <View className="noDataImg">
              <Image
                mode="aspectFill"
                src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2419010027,1924767588&fm=26&gp=0.jpg"
              ></Image>
            </View>
            <View className="noData">暂无数据</View>
          </View>
        </View> */}
      </View>
    );
  }
}
