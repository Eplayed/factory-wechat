/*
 * @Author: zyj
 * @Date: 2020-09-03 15:09:43
 * @LastEditors: zyj
 * @LastEditTime: 2021-02-01 10:52:22
 * @Description: file content
 * @FilePath: /factorynike-mini/src/pages/index/index.tsx
 */
import React, { Component } from "react";
import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtButton, AtAvatar, AtCard, AtGrid } from "taro-ui";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

export default class Index extends Component {
  state: StateType = {
    client: "driver",
    navData: [
      {
        image:
          "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
        // value: "领取中心"
      },
      {
        image:
          "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
        // value: "找折扣"
      },
      {
        image:
          "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
        // value: "领会员"
      },
      {
        image:
          "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
        // value: "新品首发"
      }
    ]
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  renderName = name => {
    return name === "driver" ? "司机" : "收货端";
  };

  render() {
    const { client, navData } = this.state;
    return (
      <View className="index">
        <AtAvatar
          className="marginSpace"
          circle
          text="我的"
          size="small"
        ></AtAvatar>
        <AtCard title="上汽乘用车有限责任公司" className="cardBanner">
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
                  src="http://www.saicgroup.com/chinese/images/pictures/2018/rx8/rx8_02.jpg"
                ></Image>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className="bannerItem">
                <Image
                  mode="aspectFill"
                  src="http://www.saicgroup.com/chinese/images/pictures/2018/mg6/mg6_01.jpg"
                ></Image>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className="bannerItem">
                <Image
                  mode="aspectFill"
                  src="http://www.saicgroup.com/chinese/images/pictures/D90_1.jpg"
                ></Image>
              </View>
            </SwiperItem>
          </Swiper>
        </AtCard>

        {/* <View>{this.renderName(client)}</View> */}
        <View>
          <AtGrid columnNum={4} data={navData} />
        </View>
        <View>

  <View className="content">
    暂无数据
  </View>
        </View>
      </View>
    );
  }
}
