import { getUserInfo, wx_login, setUserInfo } from "@/api/login";
import GetUserInfo from "@/components/GetUserInfo";
import { logo } from "@/images/load";
import { clearUserInfo, setStore, getStore } from "@/utils/utils";
import { Image, View, Text } from "@tarojs/components";
import Taro, { Component, Config } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import "./index.scss";
import login_bg from "@/images/card/login_bg.png";
import login_head from "@/images/card/login_head.png";
import wechat from "@/images/card/wechat.png";
import defaultAvatar from "@/images/card/default_user.png";

class _page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // token,
      userInfo: {
        nickName: null,
        avatarUrl: defaultAvatar,
      },
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  config: Config = {
    navigationStyle: "custom",
    navigationBarBackgroundColor: "#41403F",
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
            Taro.navigateTo({
              url: "/pages/public/index",
            });
          },
        );
      });
    } else {
      clearUserInfo();
    }
  };

  goToNext = (status) => {
    if (status) {
      Taro.reLaunch({
        url: "/pages/register/index",
      });
    } else {
      Taro.reLaunch({
        url: "/pages/home/index",
      });
    }
  };

  goAgreement() {
    Taro.navigateTo({
      url: "/pages/login/agreement",
    });
  }

  render() {
    return (
      <View className="login_page">
        <Image className="login_bg" src={login_bg} />
        <View className="content">
          <View className="head">
            {/* <Image src={login_head} className="login_head" /> */}
          </View>
          <View className="login_btn">
            <GetUserInfo
              getUserInfo={(e) => {
                return this.getUserInfo(e);
              }}
              my-class="loginBtnBox"
            >
              <View className="btn">
                <Image src={wechat}></Image>
                <View>微信授权登录</View>
              </View>
            </GetUserInfo>
          </View>
          <View className="agreement">
            点击登录按钮表示已阅读并同意以下
            <Text className="text" onClick={this.goAgreement}>
              服务协议
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
