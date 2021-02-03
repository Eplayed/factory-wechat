/*
 * @Author: zyj
 * @Date: 2020-09-03 15:09:43
 * @LastEditors: zyj
 * @LastEditTime: 2021-02-03 15:44:06
 * @Description: file content
 * @FilePath: /factorynike-mini/src/pages/mine/index.tsx
 */
import React, { Component } from "react";
import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtList,AtListItem } from "taro-ui";
import Taro from '@tarojs/taro'

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

export default class Index extends Component {
  state: StateType = {
   
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <AtList>

  <AtListItem title='姓名' extraText='张丽' />
  <AtListItem title='电话' extraText='1398089090809' />
</AtList>
      </View>
    );
  }
}
