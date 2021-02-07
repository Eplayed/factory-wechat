/*
 * @Author: zyj
 * @Date: 2020-12-14 14:28:58
 * @LastEditors: zyj
 * @LastEditTime: 2021-02-07 10:13:13
 * @Description: file content
 * @FilePath: /factorynike-mini/src/pages/mine/index.tsx
 */
import Taro, { FC } from "@tarojs/taro";
import { View, ScrollView, Button } from "@tarojs/components";
import React,{ useState, useEffect } from "react";
import "./index.scss";
// 函数式组件
const Page = ()=> {
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
      <ScrollView >
      <Button>Reset</Button>
      </ScrollView>

    </View>
  );
}

export default Page;
