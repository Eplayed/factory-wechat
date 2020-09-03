import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image, Camera, Button } from "@tarojs/components";
import { getUserBaseInfo } from "@/api/personal";
import {
  AtList,
  AtListItem,
  AtAvatar,
  AtToast,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
} from "taro-ui";
import "./index.scss";
import order_bg from "@/images/card/order_bg.png";

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

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {};

  config: Config = {
    navigationBarTitleText: "扫码",
    navigationBarBackgroundColor: "#A8334D",
    navigationBarTextStyle: "white",
    backgroundColor: "#F5F5F5",
  };

  componentWillMount() { }

  componentDidMount() { }

  componentDidShow() {
    const { tabBarStore } = this.props;
    tabBarStore.setIndex(1);
  }

  componentWillReact() { }

  takePhoto = () => {
    Taro.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log("res", res);
      },
    });
  };

  render() {
    return (
      <View className="layout_page">
        <View className="userDeatil">
          <Image src={order_bg} className="user_bg" />
        </View>
        <View className="qrcode_body">
          <Button
            type="primary"
            onClick={() => {
              return this.takePhoto();
            }}
          >
            拍照
          </Button>
        </View>
      </View>
    );
  }
}

export default _page;
