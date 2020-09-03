import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import Index from "./pages/login";

import counterStore from "./store/counter";
import tabBarStore from "./store/tabBarStore";

import "@/assets/style/reset.scss";

import "./app.scss";

import { clearUserInfo, getStore, setStore } from "@/utils/utils";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
  tabBarStore,
};

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentWillMount() {
    // const nowTime = new Date().getTime();
    // const getUserInfo_time = getStore("getUserInfo_time");
    // // 如果不存在时间点,则去login页面
    // if (getUserInfo_time) {
    //   //如果7天没操作就清空用户存储
    //   const day7 = 24 * 60 * 60 * 1000 * 7;
    //   if (nowTime - getUserInfo_time - day7 > 0) {
    //     clearUserInfo();
    //   }
    // } else {
    //   Taro.navigateTo({
    //     url: "/pages/login/index",
    //   });
    // }
  }

  config: Config = {
    pages: [
      "pages/home/index", //首页
      "pages/personal/index", //个人中心
      "pages/login/index", //个人中心
      "pages/succues/index", //提交成功
      "pages/result/index", //结果页
      "pages/public/index", //公众页

      "pages/order/index", //订单
      "pages/order_detail/index", //订单详情
      "pages/report/index", //报告页
      "pages/qrCode/index", //扫码页
      "pages/webview/index",
      "pages/login/agreement",
    ],
    usingComponents: {},

    requiredBackgroundModes: ["audio"],
    window: {
      navigationBarBackgroundColor: "#ffffff",
      navigationBarTextStyle: "black",
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/home/index",
          text: "",
        },
        {
          pagePath: "pages/qrCode/index",
          text: "",
        },
        {
          pagePath: "pages/personal/index",
          text: "",
        },
      ],
      custom: true,
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
