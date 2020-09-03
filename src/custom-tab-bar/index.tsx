import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";

import { tab_bar } from "@/images/load";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  tabBarStore: any;
};

interface TabBar {
  props: ComponentsProps;
  state: StateType;
}

import { observer, inject } from "@tarojs/mobx";

@inject("tabBarStore")
@observer
class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          pagePath: "/pages/home/index",
          // iconPath: "../images/tab_bar/home.png",
          // selectedIconPath: "../images/tab_bar/home-active.png",
          iconPath: tab_bar[0].iconPath,
          selectedIconPath: tab_bar[0].selectedIconPath,
          index: 0,
          name: "首页",
        },
        {
          pagePath: "/pages/qrCode/index",
          // iconPath: "../images/tab_bar/personal.png",
          // selectedIconPath: "../images/tab_bar/personal-active.png",
          iconPath: tab_bar[1].iconPath,
          selectedIconPath: tab_bar[1].selectedIconPath,
          index: 1,
          name: "扫码",
        },
        {
          pagePath: "/pages/personal/index",
          // iconPath: "../images/tab_bar/personal.png",
          // selectedIconPath: "../images/tab_bar/personal-active.png",
          iconPath: tab_bar[2].iconPath,
          selectedIconPath: tab_bar[2].selectedIconPath,
          index: 2,
          name: "我的",
        },
      ],
    };
  }

  state: StateType = {};

  switchTab = (item) => {
    if (item.name === "扫码") {
      Taro.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          Taro.navigateTo({
            url: `/pages/result/index?result=${res.result}`,
          });
        },
      });
    } else {
      const url = item.pagePath;
      Taro.switchTab({ url });
    }

  };

  render() {
    const { list } = this.state;
    const { tabBarStore } = this.props;
    const { tabIndex } = tabBarStore;

    return (
      <View className="wrapper">
        <View className="tabList">
          <View className="tabImgs">
            <Image
              onClick={() => {
                this.switchTab(list[0]);
              }}
              className="tabTn"
              data-item={list[0]}
              src={
                tabIndex === 0
                  ? tab_bar[0].selectedIconPath
                  : tab_bar[0].iconPath
              }
            />
            <View
              className={tabIndex === 0 ? "active name" : "name"}
            >
              首页
            </View>
          </View>
          <View className="tabImgs">
            <Image
              onClick={() => {
                this.switchTab(list[1]);
              }}
              className="tabTn qrcode"
              data-item={list[1]}
              src={
                tabIndex === 1
                  ? tab_bar[1].selectedIconPath
                  : tab_bar[1].iconPath
              }
            />
            <View
              className={tabIndex === 1 ? "active name" : "name"}
            >
              扫码
            </View>
          </View>
          <View className="tabImgs">
            <Image
              onClick={() => {
                this.switchTab(list[2]);
              }}
              className="tabTn"
              data-item={list[2]}
              src={
                tabIndex === 2
                  ? tab_bar[2].selectedIconPath
                  : tab_bar[2].iconPath
              }
            />
            <View
              className={tabIndex === 2 ? "active name" : "name"}
            >
              我的
            </View>
          </View>
          {/* {list.map((item, index) => {
            return (
              <View className='tabImgs'>
                <Image
                  onClick={this.switchTab}
                  className="tabTn"
                  key={index}
                  data-item={item}

                  src={
                    item.index === tabIndex
                      ? item.selectedIconPath
                      : item.iconPath
                  }
                />
                <View
                  className={item.index === tabIndex ? "active name" : "name"}
                >
                  {item.name}
                </View>
              </View>
            );
          })} */}
        </View>
      </View>
    );
  }
}

export default TabBar;
