/*
 * @Author: zyj
 * @Date: 2020-12-14 14:28:58
 * @LastEditors: zyj
 * @LastEditTime: 2021-02-03 15:53:53
 * @Description: file content
 * @FilePath: /factorynike-mini/src/pages/mine/index.tsx
 */
import Taro, { FC } from "@tarojs/taro";
import { View, ScrollView, Button } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import React, { useState, useEffect } from "react";
import "./index.scss";
// 函数式组件
const Page = () => {
  const [userId] = useState<number>(Taro.getStorageSync("userId"));
  const [hasMore, setHasMore] = useState<boolean>(true);
  useEffect(() => {
    getFollowedList();
  }, []);

  function getFollowedList() {
    if (!hasMore) return;
    console.log(12);
  }

  return (
    <View className="index">
      <ScrollView>
        <View className="index">
          <AtList>
            <AtListItem title="姓名" extraText="张丽" />
            <AtListItem title="电话" extraText="1398089090809" />{" "}
          </AtList>
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;
