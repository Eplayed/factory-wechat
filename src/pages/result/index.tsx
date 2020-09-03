import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { request_json } from "@/utils/http";
import "./index.scss";
import { startDetection } from "@/api/order";
import order_bg from "@/images/card/order_bg.png";
import { formatDatatoNull } from "@/utils/index";

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
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    loading: false,
    detail: {
      companyResponse: {
        companyName: "",
        argScore: "",
        mobile: "",
        email: "",
      },
      createTime: "",
      applyUserName: "",
      applyCompany: "",
      issueDescribe: "",
      orderNum: "",
    },
    showBottom: false,
  };

  config: Config = {
    navigationBarTitleText: "来访者确认",
    navigationBarBackgroundColor: "#AF0051",
    navigationBarTextStyle: "white",
    backgroundColor: "#F5F5F5",
  };

  componentWillMount() {
    console.log(this.$router.params);
    const { result } = this.$router.params;
    this.fetchOrderDetail(result).then((res: any) => {
      console.log("res", res);
      if (res.code === "OK") {
        this.setState({
          detail: formatDatatoNull(res.data),
          showBottom: true,
        });
      }
    });
  }

  fetchOrderDetail = (url) => {
    return request_json({
      url,
      method: "get",
    });
  };

  componentDidMount() {}

  componentDidShow() {}

  componentWillReact() {}

  start = () => {
    const {
      detail: { id },
    } = this.state;
    this.setState({ loading: true });
    startDetection({ orderId: id })
      .then((res: any) => {
        if (res.code == "OK") {
          Taro.switchTab({
            url: "/pages/home/index",
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { detail, loading, showBottom } = this.state;
    return (
      <View className="layout_page result_page">
        <View className="userDeatil">
          <Image src={order_bg} mode="aspectFit" className="user_bg" />
        </View>
        <View className="result_body layout_body">
          <View className="title">来访者信息</View>
          <View className="card">
            <View className="col">
              <View className="label">检测公司</View>
              <View className="val">{detail.companyResponse.companyName}</View>
            </View>
            <View className="col">
              <View className="label">公司评分</View>
              <View className="val">{detail.companyResponse.argScore}</View>
            </View>
            <View className="col">
              <View className="label">联系电话</View>
              <View className="val">{detail.companyResponse.mobile}</View>
            </View>
            <View className="col">
              <View className="label">联系邮箱</View>
              <View className="val">{detail.companyResponse.email}</View>
            </View>
          </View>
          <View className="title">关联检测订单</View>
          <View className="card">
            <View className="col">
              <View className="label">申请时间</View>
              <View className="val">{detail.createTime}</View>
            </View>
            <View className="col">
              <View className="label">申请人</View>
              <View className="val">{detail.applyUserName}</View>
            </View>
            <View className="col">
              <View className="label">申请单位</View>
              <View className="val">{detail.applyCompany}</View>
            </View>
            <View className="col">
              <View className="label">问题描述</View>
              <View className="val">{detail.issueDescribe}</View>
            </View>
            <View className="col">
              <View className="label">订单编号</View>
              <View className="val">{detail.orderNum}</View>
            </View>
          </View>
        </View>
        {showBottom && (
          <View className="bottom">
            {loading ? (
              <View className="detection_btn loading">开始检测</View>
            ) : (
              <View
                className="detection_btn"
                onClick={() => {
                  this.start();
                }}
              >
                开始检测
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default _page;
