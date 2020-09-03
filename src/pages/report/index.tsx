import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Button, Input, Image } from "@tarojs/components";
import "./index.scss";
import order_bg from "@/images/card/order_bg.png";
import noData from "@/images/card/noreport.png";

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
  config: Config = {
    navigationBarTitleText: "",
    navigationBarBackgroundColor: "#AF0051",
    navigationBarTextStyle: "white",
    backgroundColor: "#F5F5F5",
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
  };

  componentWillMount() {
    // this.state.testReport = this.$router.params.testReport;
    // this.state.pdfUrl = this.$router.params.url;
    // this.state.testReport = 1;
    // this.state.pdfUrl = 'http://ip-30-ica-api.coralcodes.com/api/common/report/download/123'
    // if (this.state.testReport == '1') {
    //   Taro.showLoading({
    //     title: ''
    //   })
    //   Taro.downloadFile({
    //     // 示例 url，并非真实存在
    //     url: this.state.pdfUrl,
    //     success: (res) => {
    //       this.state.filePath = res.tempFilePath
    //       Taro.getFileSystemManager().readFile({
    //         filePath: this.state.filePath,
    //         encoding: 'utf8',
    //         success: (res: any) => {
    //           this.setState({
    //             text: res.data.slice(0, 2000)
    //           })
    //         }
    //       })
    //     },
    //     fail: (err) => {
    //       console.log(err);
    //     },
    //     complete: () => {
    //       Taro.hideLoading();
    //     }
    //   })
    // } else {
    //   showToast("暂无报告")
    // }
  }

  render() {
    return (
      <View className="layout_page report_page">
        <View className="userDeatil">
          <Image src={order_bg} className="user_bg" />
          <View className="userInfo"></View>
        </View>
        <View className="layout_body report_body">
          <View className="noData">
            <Image mode="aspectFit" src={noData} />
          </View>

        </View>
      </View>
    );
  }
}

export default _page;
