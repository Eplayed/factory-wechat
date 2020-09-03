import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { fetchOrderDetail } from "@/api/order";
import "./index.scss";
import order_bg from "@/images/card/home.png";
import close from "@/images/card/close.png";
import {
  setStatusButton,
  setStatus,
  formatDatatoNull,
  downReport,
  preViewReport,
  sendReportEmail,
} from "@/utils/index";
import { AtActionSheet, AtTextarea, AtRate } from "taro-ui";
import OrderSheet from "@/components/OrderSheet";
import { getStore } from "@/utils/utils";
import PublicModal from "@/components/PublicModal";

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
    isOpend: false,
    fansStatus: false,
    opendModal: false,
    detail: {
      companyResponse: {},
      status: {
        value: 0,
      },
    },
  };

  config: Config = {
    navigationBarTitleText: "",
    navigationBarBackgroundColor: "#AF0051",
    navigationBarTextStyle: "white",
    backgroundColor: "#F5F5F5",
  };

  componentWillMount() { }

  componentDidMount() {
    const { orderId } = this.$router.params;
    const fansStatus = getStore("FANSSTATUS");
    fetchOrderDetail({ orderId }).then((res: any) => {
      if (res.code == "OK") {
        const data = res.data;

        this.setState({
          detail: formatDatatoNull(data),
          orderId,
          fansStatus,
        });
      }
    });
  }

  componentDidShow() { }

  componentWillReact() { }

  handleDesChange = (e) => {
    this.setState({ des: e.detail.value });
  };

  onSubmitDone = () => {
    Taro.navigateBack({
      delta: 1,
    });
  };

  showSheet = (status) => {
    let title = "";
    // 1:待审核,2:待上门,3:进行中,4:待评价(用户有待评价,专家公司实际上是已完成),5:已完成,-1:待上门申请取消(待上门),-2:已取消,-3:拒绝申请}
    switch (status) {
      case 1:
      case 2:
        title = "取消理由";

        break;
      case 4:
        title = "评价本次服务";

        break;

      default:
        break;
    }
    if (status === 5) {
      const { orderId, detail } = this.state;
      preViewReport(detail);
    } else {
      this.setState({
        isOpend: true,
      });
    }
  };

  downReport = (detail) => {
    const { fansStatus } = this.state;
    if (fansStatus) {
      downReport(detail);
    }
  };

  preViewReport = (detail) => {
    const { fansStatus } = this.state;
    if (fansStatus) {
      preViewReport(detail);
    } else {
      this.setState({ opendModal: true })
    }
  };

  sendReportEmail = (detail) => {
    const { fansStatus } = this.state;
    if (fansStatus) {
      sendReportEmail(detail);
    }
  };

  render() {
    const { detail, isOpend, fansStatus, opendModal } = this.state;
    const { status } = detail;
    let renderCompany;
    if (
      (status.value === 2 ||
        status.value === 3 ||
        status.value === 4 ||
        status.value === 5 ||
        status.value === -1) &&
      detail.companyResponse
    ) {
      renderCompany = (
        <View className="card">
          <View className="col">
            <View className="label">检测公司</View>
            <View className="val">{detail.companyResponse.companyName}</View>
          </View>
          <View className="col">
            <View className="label">检测公司评分</View>
            <View className="val">{detail.companyResponse.argScore}</View>
          </View>
          <View className="col">
            <View className="label">检测公司邮箱</View>
            <View className="val">{detail.companyResponse.email}</View>
          </View>
          <View className="col">
            <View className="label">预约上门时间</View>
            <View className="val">
              {detail.subscribeStartTime
                ? `${detail.subscribeStartTime.split("-").join(".")} - ${
                detail.subscribeEndTime.split(" ")[1]
                }`
                : "预约中"}
            </View>
          </View>
          <View className="col">
            <View className="label">检测公司电话</View>
            <View className="val phone">{detail.companyResponse.mobile}</View>
          </View>
        </View>
      );
    }
    return (
      <View className="layout_page order_detail_page">
        <View className="userDeatil">
          <View className="status">
            {status.value === -1 ? (
              <View className="canclState">
                <View>{setStatus(status.value)}</View>
                <View className="extr"> (已申请取消订单)</View>
              </View>
            ) : (
                <View>{setStatus(status.value)}</View>
              )}
          </View>
          <Image mode="aspectFit" src={order_bg} className="user_bg" />
          <View className="userInfo"></View>
          {status.value === -1 && (
            <View className="extrTitle">
              平台将会联系您，审核您的申请，请保持通讯顺畅
            </View>
          )}
        </View>
        <View className="layout_body order_detail_body">
          <View className="card">
            {(status.value === -2 || status.value === -1) && (
              <View className="col">
                <View className="label">取消理由</View>
                <View className="val">{detail.cancelReason}</View>
              </View>
            )}
            {status.value === -3 && (
              <View className="col">
                <View className="label">拒绝理由</View>
                <View className="val">{detail.refuseReason}</View>
              </View>
            )}
          </View>
          {renderCompany}

          <View className="card">
            <View className="col">
              <View className="label">昵称</View>
              <View className="val">{detail.nickName}</View>
            </View>
            <View className="col">
              <View className="label">申请人</View>
              <View className="val">{detail.applyUserName}</View>
            </View>
            <View className="col">
              <View className="label">邮箱</View>
              <View className="val">{detail.applyUserEmail}</View>
            </View>
            <View className="col">
              <View className="label">手机号码</View>
              <View className="val phone">{detail.applyUserPhone}</View>
            </View>
            <View className="col">
              <View className="label">申请单位</View>
              <View className="val">{detail.applyCompany}</View>
            </View>
            <View className="col">
              <View className="label">单位地址</View>
              <View className="val">{detail.detailAddress}</View>
            </View>
          </View>

          <View className="card">
            <View className="col">
              <View className="label">问题描述</View>
            </View>
            <View className="col des">
              <View>{detail.issueDescribe}</View>
            </View>
          </View>

          <View className="card">
            {(status.value === 4 || status.value === 5) && (
              <View>
                <View className="col">
                  <View className="label">完成检测时间</View>
                  <View className="val">
                    {detail.endDetectionTime
                      ? detail.endDetectionTime.split("-").join(".")
                      : ""}
                  </View>
                </View>
                <View className="col">
                  <View className="label">开始检测时间</View>
                  <View className="val">
                    {detail.startDetectionTime
                      ? detail.startDetectionTime.split("-").join(".")
                      : ""}
                  </View>
                </View>
              </View>
            )}
            {status.value === 3 && (
              <View>
                <View className="col">
                  <View className="label">开始检测时间</View>
                  <View className="val">
                    {detail.startDetectionTime
                      ? detail.startDetectionTime.split("-").join(".")
                      : ""}
                  </View>
                </View>
              </View>
            )}
            {detail.allotTime ? (
              <View className="col">
                <View className="label">服务分派时间</View>
                <View className="val">
                  {detail.allotTime
                    ? detail.allotTime.split("-").join(".")
                    : ""}
                </View>
              </View>
            ) : (
                ""
              )}

            <View className="col">
              <View className="label">申请时间</View>
              <View className="val">
                {detail.createTime
                  ? detail.createTime.split("-").join(".")
                  : ""}
              </View>
            </View>
            <View className="col">
              <View className="label">订单编号</View>
              <View className="val">{detail.orderNum}</View>
            </View>
          </View>
          {status.value === 5 && (
            <View className="card">
              <View className="col">
                <View>我的评价</View>
              </View>
              <View className="rate">
                <AtRate className="rateNum" size={30} value={detail.score} />
                <View className="num">{detail.score}分</View>
              </View>
              <View className="col des">
                <View>{detail.comments}</View>
              </View>
            </View>
          )}
        </View>
        {/* 按钮 */}
        {(status.value === 1 ||
          status.value === 2 ||
          status.value === 4 ||
          status.value === -1) && (
            <View className="toDetail">
              <View
                className="buttonView"
                onClick={() => {
                  this.showSheet(status.value);
                }}
              >
                {setStatusButton(status.value)}
              </View>
            </View>
          )}
        {status.value === 5 && (
          <View className="toDetail">
            <View
              className={!fansStatus ? "buttonView disabled" : "buttonView"}
              onClick={() => {
                this.downReport(detail);
              }}
            >
              复制下载链接
            </View>
            <View
              className={!fansStatus ? "buttonView disabled" : "buttonView"}
              onClick={() => {
                this.sendReportEmail(detail);
              }}
            >
              报告发送邮箱
            </View>
            <View
              className={!fansStatus ? "buttonView disabled" : "buttonView"}
              onClick={() => {
                this.preViewReport(detail);
              }}
            >
              预览报告
            </View>
          </View>
        )}

        <OrderSheet
          order={detail}
          isOpend={isOpend}
          onDone={() => {
            this.onSubmitDone();
          }}
          onClose={() => {
            return this.setState({ isOpend: false });
          }}
        ></OrderSheet>
        <PublicModal opendModal={opendModal}></PublicModal>
      </View>
    );
  }
}

export default _page;
