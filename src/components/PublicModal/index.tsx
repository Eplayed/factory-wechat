import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtModal, AtModalContent } from "taro-ui";
import closeImage from "@/images/card/close.png";
import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  opendModal: boolean;
  close: Function;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

import { observer, inject } from "@tarojs/mobx";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps: ComponentsProps = {
    opendModal: false,
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentDidShow() {}

  componentWillReact() {}

  closeModal() {
    this.props.close();
  }

  render() {
    const { opendModal } = this.props;
    return (
      <AtModal isOpened={opendModal}>
        <AtModalContent>
          <View className="header">
            <View className="title">
              关注公众号
              <Image
                className="close"
                src={closeImage}
                mode="widthFix"
                onClick={this.closeModal.bind(this)}
              ></Image>
            </View>
            <View>获取更多消息提醒</View>
          </View>
          <View className="content">
            关注「亚洲电能质量联盟APQI」公众号，可获得更多关于活动的消息和通知，点击关注或回复1，以获取公众号二维码，长按关注。
          </View>
          <View style="display:flex;justify-content: center;">
            <AtButton className="public_btn" circle openType="contact">
              去回复
            </AtButton>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default _page;
