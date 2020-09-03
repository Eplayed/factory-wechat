import { getUserInfo, wx_login, setUserInfo } from "@/api/login";
import GetUserInfo from "@/components/GetUserInfo";
import { logo } from "@/images/load";
import { clearUserInfo, setStore, getStore } from "@/utils/utils";
import { Image, View, Video } from "@tarojs/components";
import Taro, { Component, Config } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import "./index.scss";
import login_bg from "@/images/card/login_bg.png";
import login_head from "@/images/card/login_head.png";
import wechat from "@/images/card/wechat.png";
import defaultAvatar from "@/images/card/default_user.png";

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

class _page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // token,
      timer: null,
      fansStatus: false
    };
  }

  componentWillMount() { }

  componentDidMount() {

  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({ timer: null });
  }

  componentDidHide() { }

  componentDidShow() {
    setUserInfo().then((res: any) => {
      console.log('user', res)
      if (res.code === 'OK') {
        const self = this;
        const { fansStatus } = res.data
        setStore('FANSSTATUS', fansStatus);
        const timer = setTimeout(() => {
          Taro.switchTab({
            url: "/pages/home/index",
          });
        }, 5000);
        self.setState({
          timer,
          fansStatus
        });
      }
    })
  }

  componentWillReact() { }

  config: Config = {
    navigationStyle: "custom",
    navigationBarBackgroundColor: "#41403F",
  };


  toNext = () => {
    Taro.switchTab({
      url: "/pages/home/index",
    });
  }


  render() {
    const { fansStatus } = this.state;
    return (
      <View className="login_page">
        <Image className="login_bg" src={login_bg} />
        <View className="head">
          {/* <Image src={login_head} className="login_head" /> */}
        </View>

        <View className="info">
          <View>本活动由“亚洲电能质量产业联盟”举办</View>
          {
            fansStatus == false && (<View className="infobody">
              <View>为了您获得更好的活动服务体验，</View>
              <View>建议在报名信息提交完成后关注</View>
              <View>“亚洲电能质量产业联盟”微信公众号</View>
            </View>)
          }


        </View>

        <View className="next" onClick={() => {
          this.toNext();
        }}
        >下一步</View>
      </View>
    );
  }
}

export default _page;
