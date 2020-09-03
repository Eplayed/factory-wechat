import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { fetchOrderList } from "@/api/order";
import { AtButton, AtModal, AtModalContent } from "taro-ui";
import PublicModal from "@/components/PublicModal";
import "./index.scss";
import order_bg from "@/images/card/order_bg.png";
import success from "@/images/card/success.png";

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
import { getStore } from "@/utils/utils";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    orderId: null,
    fansStatus: false,
    opendModal: false,
  };

  config: Config = {
    navigationBarTitleText: "",
    navigationBarBackgroundColor: "#AF0051",
    navigationBarTextStyle: "white",
    backgroundColor: "#F5F5F5",
  };

  componentWillMount() {
    console.log(this.$router.params);
    const { orderId } = this.$router.params;
    const fansStatus = getStore("FANSSTATUS");
    this.setState({
      orderId,
      fansStatus,
    });
  }

  componentDidMount() {
    // 订单状态{1:待审核,2:待上门,3:进行中,4:待评价,-2:已取消},可用值:1,2,3,4,-2
    // const _this = this;
    // const token = getStore("userToken");
    // if (token) {
    //   const userInfo = getStore("userInfo");
    //   this.setState({ userInfo });
    // }
  }

  componentDidShow() {
    this.hideModal();
  }

  componentWillReact() {}

  getDetail = () => {
    const { orderId } = this.state;
    Taro.navigateTo({
      url: `/pages/order_detail/index?orderId=${orderId}`,
    });
  };

  subscribeMessage = () => {};

  publicDialog = () => {
    const { fansStatus } = this.state;
    if (!fansStatus) {
      this.setState({
        opendModal: true,
      });
    }
  };

  hideModal() {
    this.setState({
      opendModal: false,
    });
  }

  render() {
    const { fansStatus, opendModal } = this.state;
    return (
      <View className="layout_page success_page">
        <View className="userDeatil">
          <Image src={order_bg} mode="aspectFit" className="user_bg" />
          <View className="userInfo"></View>
        </View>
        <View className="layout_body success_body">
          <Image src={success} className="success" />
          <View className="title">申请提交成功</View>
          <View className="info">如果你的申请通过，工作人员将会联系</View>
          <View className="info">您核实问题需求，请您保持通讯畅通。</View>

          <View className="info">为了您获得更好的活动服务体验，建议</View>
          <View className="info">在报名信息提交完成后关注</View>
          <View className="info bold">“亚洲电能质量产业联盟”微信公众号</View>
          <View className="btn_group">
            <View
              onClick={() => {
                this.getDetail();
              }}
              className={`deail_btn ${fansStatus ? "fans" : ""}`}
            >
              查看详情
            </View>
            {!fansStatus && (
              <View
                onClick={() => {
                  this.publicDialog();
                }}
                className="deail_btn"
              >
                关注公众号
              </View>
            )}
          </View>
        </View>
        <PublicModal
          opendModal={opendModal}
          close={this.hideModal.bind(this)}
        ></PublicModal>
      </View>
    );
  }
}

export default _page;
