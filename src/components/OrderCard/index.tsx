import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { setStatusButton, setStatus } from "@/utils/index";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  orderInfo: any;
  fansStatus: boolean;
  toDetail: Function;
  downReport: Function;
  sendReportEmail: Function;
  preViewReport: Function;
  toSheet: Function;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

class _page extends Component {
  static defaultProps: ComponentsProps = {
    orderInfo: {
      status: {},
    },
    fansStatus: false,
    toDetail: () => {},
    downReport: () => {},
    sendReportEmail: () => {},
    preViewReport: () => {},
    toSheet: () => {},
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

  render() {
    const {
      orderInfo,
      toDetail,
      downReport,
      preViewReport,
      sendReportEmail,
      toSheet,
      fansStatus,
    } = this.props;
    return (
      <View className="order_card">
        <View
          className="head"
          onClick={() => {
            toDetail(orderInfo.id);
          }}
        >
          <View className="num">订单编号: {orderInfo.orderNum}</View>
          <View className="status">
            {setStatus(orderInfo.status.value)}
            {orderInfo.status.value === -1 && (
              <View className="status_extra">(已申请取消订单)</View>
            )}
          </View>
        </View>
        <View
          className="body"
          onClick={() => {
            toDetail(orderInfo.id);
          }}
        >
          {orderInfo.status.value === 1 ||
          orderInfo.status.value === -2 ||
          orderInfo.status.value === -3 ? (
            <View className="col">
              <View>申请人: {orderInfo.applyUserName}</View>
              <View>申请单位:{orderInfo.applyCompany} </View>
              {orderInfo.status.value === -2 ||
              orderInfo.status.value === -3 ? (
                <View>
                  取消申请时间:{" "}
                  {orderInfo.cancelTime
                    ? orderInfo.cancelTime.split("-").join(".")
                    : ""}
                </View>
              ) : (
                <View>
                  申请时间:{" "}
                  {orderInfo.createTime
                    ? orderInfo.createTime.split("-").join(".")
                    : ""}
                </View>
              )}
            </View>
          ) : (
            <View className="col">
              <View>检测公司: {orderInfo.companyResponse.companyName}</View>
              <View>检测公司电话:{orderInfo.companyResponse.mobile} </View>
              {orderInfo.status.value === 3 ? (
                <View>
                  开始检测时间:{" "}
                  {orderInfo.startDetectionTime
                    ? orderInfo.startDetectionTime.split("-").join(".")
                    : "预约中"}
                </View>
              ) : (
                <View>
                  {orderInfo.status.value === 4 ||
                  orderInfo.status.value === 5 ? (
                    <View>
                      完成检测时间:{" "}
                      {orderInfo.endDetectionTime
                        ? orderInfo.endDetectionTime.split("-").join(".")
                        : "预约中"}
                    </View>
                  ) : (
                    <View>
                      预约上门时间:{" "}
                      {orderInfo.subscribeStartTime
                        ? `${orderInfo.subscribeStartTime
                            .split("-")
                            .join(".")} - ${
                            orderInfo.subscribeEndTime.split(" ")[1]
                          }`
                        : "预约中"}
                    </View>
                  )}
                </View>
              )}

              <View>申请单位: {orderInfo.applyCompany}</View>
            </View>
          )}
        </View>

        <View className="toDetail">
          {orderInfo.status.value === 5 ? (
            <View className="buttonGroup">
              <View
                className={!fansStatus ? "buttonView disabled" : "buttonView"}
                onClick={() => {
                  downReport();
                }}
              >
                复制下载链接
              </View>
              <View
                className={!fansStatus ? "buttonView disabled" : "buttonView"}
                onClick={() => {
                  sendReportEmail();
                }}
              >
                报告发送邮箱
              </View>
              <View
                className={!fansStatus ? "buttonView disabled" : "buttonView"}
                onClick={() => {
                  preViewReport();
                }}
              >
                预览报告
              </View>
            </View>
          ) : (
            <View
              className="buttonView"
              onClick={() => {
                toSheet(orderInfo.id);
              }}
            >
              {setStatusButton(orderInfo.status.value)}
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default _page;
