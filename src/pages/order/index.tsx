import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtTabs, AtLoadMore } from "taro-ui";
import { downReport, sendReportEmail, preViewReport } from "@/utils/index";
import "./index.scss";
import order_bg from "@/images/card/order_bg.png";
import noData from "@/images/card/order_noData.png";
import PublicModal from "@/components/PublicModal";
import OrderCard from "@/components/OrderCard";

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
import { setStore, getStore } from "@/utils/utils";
import { fetchOrderList } from "@/api/order";
import OrderSheet from "@/components/OrderSheet";
import { setUserInfo } from "@/api/login";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    currentTab: 0,
    tabs: [
      { title: "全部" },
      { title: "待审核" },
      { title: "待上门" },
      { title: "进行中" },
      { title: "待评价" },
      { title: "已取消" },
    ],
    param: {
      pageIndex: 1,
      pageSize: 20,
      status: "",
    },
    loadStatus: "more",
    orderList: [],
    orderItem: {
      status: {
        value: null,
      },
    },
    isOpend: false,
    opendModal: false,
  };

  config: Config = {
    navigationBarTitleText: "",
    navigationBarBackgroundColor: "#AF0051",
    navigationBarTextStyle: "white",
    backgroundColor: "#F5F5F5",
  };

  componentWillMount() {}

  getOrderList = (params, newlist) => {
    fetchOrderList(params).then((res: any) => {
      let list = JSON.parse(JSON.stringify(newlist));
      if (res.code === "OK") {
        list = list.concat(res.data.list);
        let loadStatus = "more";
        if (res.data.pages === params.pageIndex) {
          loadStatus = "noMore";
        }
        list.forEach((item) => {
          Object.keys(item).forEach((itemKey) => {
            item[itemKey] = item[itemKey] !== null ? item[itemKey] : "";
          });
        });
        this.setState({
          orderList: list,
          loadStatus,
        });
      }
    });
  };

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
    const { state } = this.$router.params;
    const storeState = getStore("ORDER_STATE");
    setUserInfo().then((res: any) => {
      console.log("user", res);
      if (res.code === "OK") {
        const { fansStatus } = res.data;
        setStore("FANSSTATUS", fansStatus);
        this.setState({
          fansStatus,
          opendModal: false,
        });
      }
    });
    // console.log("state", state);
    // console.log("storeState", storeState);
    //记录当前状态
    let currentState;
    if (state && state !== "") {
      if (state === "all") {
        currentState = "";
      } else {
        currentState = state;
      }
    } else {
      currentState = storeState;
    }

    const { param } = this.state;
    const params = { ...param };

    params.status = currentState;
    // 转化当前状态为当前TAB
    const currentTab = currentState === "-2" ? "5" : currentState;
    // 更新状态
    this.setState({
      currentTab: Number(currentTab),
      param: params,
    });
    setStore("ORDER_STATE", currentState);

    this.getOrderList(params, []);
  }

  componentWillReact() {}

  handleClick = (value) => {
    const { param } = this.state;
    let status = "";
    switch (value) {
      case 0:
        status = "";
        break;
      case 1:
        status = "1";
        break;
      case 2:
        status = "2";
        break;
      case 3:
        status = "3";
        break;
      case 4:
        status = "4";
        break;
      case 5:
        status = "-2";
        break;

      default:
        break;
    }
    const data = JSON.parse(JSON.stringify(param));
    data.status = status;
    this.setState({
      param: data,
      currentTab: value,
    });
    setStore("ORDER_STATE", value);
    this.getOrderList(data, []);
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
      this.setState({ opendModal: true });
    }
  };

  sendReportEmail = (detail) => {
    const { fansStatus } = this.state;
    if (fansStatus) {
      sendReportEmail(detail);
    }
  };

  onSubmitDone = () => {
    const { param } = this.state;
    const data = JSON.parse(JSON.stringify(param));
    (data.pageIndex = 1),
      this.setState({
        isOpend: false,
        param: data,
      });
    this.getOrderList(data, []);
  };

  gotoDetail = (order) => {
    const { param } = this.state;
    // console.log("status", param.status);
    // console.log("param", param);
    console.log("order", order);
    setStore("ORDER_STATE", param.status);
    this.$router.params.state = "";
    Taro.navigateTo({
      url: `/pages/order_detail/index?orderId=${order.id}`,
    });
  };

  gotoSheet = (order) => {
    const { param } = this.state;
    // console.log("status", param.status);
    // console.log("param", param);
    console.log("order", order);
    const { status } = order;

    if (
      status.value == 4 ||
      status.value == 1 ||
      status.value == 2 ||
      status.value == -1
    ) {
      this.setState({
        isOpend: true,
        orderItem: order,
      });
    } else {
      setStore("ORDER_STATE", param.status);
      this.$router.params.state = "";
      Taro.navigateTo({
        url: `/pages/order_detail/index?orderId=${order.id}`,
      });
    }
  };

  handleLoadMore = () => {
    const { param, orderList } = this.state;
    const data = JSON.parse(JSON.stringify(param));
    data.pageIndex = param.pageIndex + 1;
    this.getOrderList(data, orderList);
    this.setState({
      param: data,
      loadStatus: "loading",
    });
  };

  handleScoreChange = (e) => {
    this.setState({
      currentScore: e,
    });
  };

  handleDesChange = (e) => {
    this.setState({ des: e.detail.value });
  };

  hideModal() {
    this.setState({
      opendModal: false,
    });
  }

  render() {
    const {
      tabs,
      currentTab,
      orderList,
      loadStatus,
      orderItem,
      isOpend,
      fansStatus,
      opendModal,
    } = this.state;
    return (
      <View className="layout_page order_page">
        <View className="userDeatil">
          <Image src={order_bg} mode="aspectFit" className="user_bg" />
          <View className="userInfo"></View>
        </View>

        <View className="layout_body order_body">
          <AtTabs
            animated={false}
            scroll
            current={currentTab}
            tabList={tabs}
            onClick={(index) => {
              this.handleClick(index);
            }}
          ></AtTabs>
          <View className="order_content">
            {orderList.length > 0 ? (
              orderList.map((item: any) => {
                return (
                  <OrderCard
                    fansStatus={fansStatus}
                    key={item.id}
                    toDetail={(id) => {
                      this.gotoDetail(item);
                    }}
                    toSheet={() => {
                      this.gotoSheet(item);
                    }}
                    downReport={(id) => {
                      this.downReport(item);
                    }}
                    preViewReport={() => {
                      this.preViewReport(item);
                    }}
                    sendReportEmail={() => {
                      this.sendReportEmail(item);
                    }}
                    orderInfo={item}
                  ></OrderCard>
                );
              })
            ) : (
              <View className="noData">
                <Image mode="aspectFit" src={noData} />
              </View>
            )}
            {orderList.length !== 0 && (
              <AtLoadMore
                className="loadMore"
                onClick={() => {
                  this.handleLoadMore();
                }}
                status={loadStatus}
              />
            )}
          </View>
        </View>
        <OrderSheet
          isOpend={isOpend}
          order={orderItem}
          onDone={() => {
            this.onSubmitDone();
          }}
          onClose={() => {
            return this.setState({ isOpend: false });
          }}
        ></OrderSheet>
        <PublicModal
          opendModal={opendModal}
          close={this.hideModal.bind(this)}
        ></PublicModal>
      </View>
    );
  }
}

export default _page;
