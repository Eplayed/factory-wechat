import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import GetUserInfo from "@/components/GetUserInfo";
import { getUserInfo, wx_login, setUserInfo } from "@/api/login";
import { clearUserInfo, setStore, getStore } from "@/utils/utils";
import { getUserBaseInfo } from "@/api/personal";
import {
  AtAvatar,
} from "taro-ui";
import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

import { observer, inject } from "@tarojs/mobx";
import defaultAvatar from "@/images/card/default_user.png";
import user_bg from "@/images/card/user_bg.png";
import pingjia from "@/images/card/pingjia.png";
import shenhe from "@/images/card/shenhe.png";
import shangmen from "@/images/card/shangmen.png";
import jinxing from "@/images/card/jinxing.png";
import quxiao from "@/images/card/quxiao.png";
import right from "@/images/card/right.png";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    userInfo: {
      nickName: null,
      avatarUrl: defaultAvatar,
    },
    url: "https://pq-smart.online",
    isToastOpened: false,
    toastText: "请先登录",
    isFocusPublic: false,
  };

  config: Config = {
    navigationBarTitleText: "我的",
    navigationBarBackgroundColor: "#AF0051",
    navigationBarTextStyle: "white",
    backgroundColor: "#F5F5F5",
  };

  componentWillMount() { }

  componentDidMount() {
    const _this = this;
    const token = getStore("userToken");
    if (token) {
      const userInfo = getStore("userInfo");
      this.setState({ userInfo });
    }
  }

  componentDidShow() {
    const { tabBarStore } = this.props;
    tabBarStore.setIndex(2);
  }

  componentWillReact() { }

  goToEdit = () => {
    const { userInfo } = this.state;
    if (userInfo) {
      Taro.navigateTo({
        url: "/pages/edit_userinfo/index",
      });
    }
  };

  goToNav = (url: string) => {
    // const { userInfo } = this.state;
    // const token = getStore("userToken");
    Taro.navigateTo({
      url,
    });
    // if (token) {
    //   Taro.navigateTo({
    //     url: url,
    //   });
    // } else {
    //   this.setState({ isToastOpened: true })
    // }
  };

  getUserInfo = (e) => {
    //每次操作记录一次时间点
    const _this = this;
    const token = getStore("userToken");
    if (token) {
      return;
    }
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
              nickName,
            },
          },
          () => {
            setStore("userInfo", this.state.userInfo);
          },
        );
      });
    } else {
      clearUserInfo();
    }
  };

  Toast = () => {
    Taro.showToast({
      title: "功能暂未开放",
      icon: "none",
    });
  };

  userInfo = () => {
    const token = getStore("userToken");
    if (token) {
      Taro.navigateTo({
        url: "/pages/personal/userinfo",
      });
    } else {
      Taro.showToast({
        title: "请登录",
        icon: "none",
      });
    }
  };

  // dynamic = () => {
  //   Taro.navigateTo({
  //     url: "/pages/dynamic_page/index",
  //   });
  // };

  // focus = () => {
  //   Taro.navigateTo({
  //     url: "/pages/focus_page/index",
  //   });
  // };

  // entered = () => {
  //   Taro.navigateTo({
  //     url: "/pages/entered_page/index",
  //   });
  // };
  gotoOrder = (state) => {
    Taro.navigateTo({
      url: `/pages/order/index?state=${state}`,
    });
  };

  goWebView(type) {
    const data = {
      article: "http://mp.weixin.qq.com/mp/homepage?__biz=MjM5OTI2MDIxNA==&hid=1&sn=30707005411488ae5a8c7fee707b8943&scene=18#wechat_redirect",
      knowledge: "https://mp.weixin.qq.com/s/-32GzFCr_rSaUS_njz1KHg",
      system: "https://pq-smart.online",
    };
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(data[type])}`,
    });
  }

  copyUrl() {
    Taro.setClipboardData({
      data: this.state.url,
    }).then(() => {
      Taro.showToast({
        title: "复制成功",
        icon: "none",
      });
    });
  }

  render() {
    const { userInfo, isToastOpened, toastText, isFocusPublic } = this.state;
    const { avatarUrl, nickName } = userInfo;
    // if (userInfo) {
    //   //
    // } else {
    //   return "";
    // }

    return (
      <View>
        <ScrollView scrollY scrollTop={0} className="personalPage">
          <View className="userDeatil">
            <Image src={user_bg} mode="aspectFit" className="user_bg" />
            <View className="userInfo">
              <GetUserInfo
                getUserInfo={(e) => {
                  return this.getUserInfo(e);
                }}
                my-class="loginBtnBox"
              >
                <AtAvatar circle image={avatarUrl}></AtAvatar>
                <View className="goEditData">
                  {nickName ? `${nickName}` : "立即登录"}
                </View>
              </GetUserInfo>
            </View>
          </View>
          <View className="personal_body">
            <View
              className="title"
              onClick={() => {
                this.gotoOrder("all");
              }}
            >
              <View className="name">我的订单</View>
              <View className="extar">查看全部</View>
            </View>
            <View className="order_status">
              <View
                className="order_item"
                onClick={() => {
                  this.gotoOrder("1");
                }}
              >
                <View className="icon">
                  <Image src={shenhe} />
                </View>
                <View className="name">待审核</View>
              </View>
              <View
                className="order_item"
                onClick={() => {
                  this.gotoOrder("2");
                }}
              >
                <View className="icon">
                  <Image src={shangmen} />
                </View>
                <View className="name">待上门</View>
              </View>
              <View
                className="order_item"
                onClick={() => {
                  this.gotoOrder("3");
                }}
              >
                <View className="icon">
                  <Image src={jinxing} />
                </View>
                <View className="name">进行中</View>
              </View>
              <View
                className="order_item"
                onClick={() => {
                  this.gotoOrder("4");
                }}
              >
                <View className="icon">
                  <Image src={pingjia} />
                </View>
                <View className="name">待评价</View>
              </View>
              <View
                className="order_item"
                onClick={() => {
                  this.gotoOrder("-2");
                }}
              >
                <View className="icon">
                  <Image src={quxiao} />
                </View>
                <View className="name">已取消</View>
              </View>
            </View>
            <View className="title context">
              <View className="name">精彩内容</View>
              <View className="extar">更多精彩内容请进入微信公众号了解！</View>
            </View>
            <View className="list">
              <View className="list-item" onClick={this.goWebView.bind(this, "knowledge")}>
                <View className="title" >知识学院</View>
                <View className="img">
                  <Image src={right} />
                </View>
              </View>

              <View className="list-item" onClick={this.goWebView.bind(this, "article")}>
                <View className="title" >文章索引</View>
                <View className="img">
                  <Image src={right} />
                </View>
              </View>

              <View className="title context">
                <View className="name">数据上传与诊断分析</View>
              </View>
              <View className="list">
                <View className="list-item" >
                  <View className="title" onClick={this.goWebView.bind(this, "system")}>电能质量云智能专家系统</View>
                  <View className="ext" onClick={this.copyUrl.bind(this)}>复制地址</View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default _page;
