/* eslint-disable react/no-unused-state */
import Taro from "@tarojs/taro";
import { View, PickerView, PickerViewColumn, Image } from "@tarojs/components";

import { AtActionSheet, AtRate, AtTextarea } from "taro-ui";
import close from "@/images/card/close.png";
import {
  cancelOrder,
  undoCancelOrder,
  evaluateOrder,
} from "@/api/order";
import "./index.scss";


type ComponentsProps = {
  order: any;
  onDone: Function;
  onClose: Function;
  isOpend: boolean;
};

type StateType = {
  [propsName: string]: any;
};

interface OrderSheet {
  props: ComponentsProps;
  state: StateType;
}

class OrderSheet extends Taro.Component {
  static defaultProps: ComponentsProps = {
    order: {
      status: {},
    },
    isOpend: false,
    onDone: () => { },
    onClose: () => { },
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    des: "",
    currentScore: 0,
    showTextArea: false,
    submitLoading: false,
  }

  handleScoreChange = (e) => {
    this.setState({
      currentScore: e,
    });
  };


  handleDesChange = (e) => {
    this.setState({ des: e });
  };

  sheetSumbit = () => {
    const { des, currentScore } = this.state;
    const { order } = this.props;
    const { status, id } = order;
    const orderId = id;
    const score = currentScore;
    if (des == "") {

      Taro.showToast({
        title: "请输入你的理由",
        icon: "none",
      });

      return;
    }
    if (score == 0 && status.value === 4) {
      Taro.showToast({
        title: "请评价本次服务",
        icon: "none",
      });
      return;
    }

    this.setState({
      submitLoading: true,
    });

    // 取消订单
    if (status.value == 1 || status.value == 2) {
      const param = {
        cancelReason: des,
        orderId,
      };
      cancelOrder(param)
        .then((res: any) => {
          if (res.code === "OK") {
            this.handleAction();
          }
          this.setState({
            submitLoading: false,
          });
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          this.setState({
            submitLoading: false,
          });
        });
    }
    // 撤销订单
    if (status.value === -1) {
      undoCancelOrder({ orderId })
        .then((res: any) => {
          if (res.code === "OK") {
            this.handleAction();
          }
          this.setState({
            submitLoading: false,
          });
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          this.setState({
            submitLoading: false,
          });
        });
    }
    // 评价

    if (status.value === 4) {
      const form = {
        comments: des,
        orderId,
        score,
      };
      evaluateOrder(form)
        .then((res: any) => {
          if (res.code === "OK") {
            this.handleAction();
          }
          this.setState({
            submitLoading: false,
          });
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          this.setState({
            submitLoading: false,
          });
        });
    }

  };

  handleAction = () => {
    Taro.showToast({
      title: "操作成功",
      icon: "none",
    });
    this.setState({
      submitLoading: false,
      showTextArea: false,
      des: "",
      currentScore: 0,
    });
    setTimeout(() => {
      this.props.onDone();
    }, 1000);
  };

  handleClose = () => {
    this.setState({
      currentScore: 0,
      showTextArea: false,
      des: "",
      submitLoading: false,
    });
    this.props.onClose();
  }

  render() {
    const { currentScore, des, showTextArea, submitLoading } = this.state;
    const { order, isOpend } = this.props;
    const { status } = order;
    let sheetTitle = "";
    if (status.value == 4) {
      sheetTitle = "评价本次服务";
    }
    if (status.value == 1 || status.value == 2) {
      sheetTitle = "取消理由";
    }
    if (status.value == -1) {
      sheetTitle = "撤销理由";
    }
    return (

      <AtActionSheet isOpened={isOpend} onClose={() => {
        return this.handleClose();
      }}
      >
        <View className="sheet_page">
          <View className="sheet_head">
            <View className="title">{sheetTitle}</View>
            <View
              className="close"
              onClick={() => {
                this.handleClose();
              }}
            >
              <Image src={close} />
            </View>
          </View>
          {status.value === 4 && (
            <View className="sheet_row">
              <AtRate
                className="rateNum"
                size={30}
                value={currentScore}
                onChange={this.handleScoreChange}
              />
              <View className="sheet_score">{currentScore}分</View>
            </View>
          )}
          <View className="sheet_body">
            {
              showTextArea ? (
                <AtTextarea
                  className="attextarea"
                  height={300}
                  focus
                  value={des}
                  onChange={this.handleDesChange.bind(this)}
                  maxLength={200}
                  placeholderStyle="color:#999;font-size:14px"
                  placeholder="请输入你的理由"
                  onBlur={() => {
                    this.setState({ showTextArea: false });
                  }}
                />
              ) : (
                  <View
                    className="textareaView"
                    onClick={() => {
                      this.setState({ showTextArea: true });
                    }}
                  >
                    {des === ""
                      ? "请输入你的理由"
                      : des}
                  </View>
                )

            }

          </View>
          {status.value === 2 && (
            <View className="extar">
              *平台将会联系你，审核您的需求，请保持通讯顺畅
            </View>
          )}
          {submitLoading ? (
            <View className="sheet_btn loading">提交中....</View>
          ) : (
              <View
                className="sheet_btn"
                onClick={() => {
                  this.sheetSumbit();
                }}
              >
                提交
              </View>
            )}
        </View>
      </AtActionSheet>
    );
  }
}
export default OrderSheet;
