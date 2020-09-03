import Taro from "@tarojs/taro";
import { sendEmail } from "@/api/order";
import { baseUrl } from "../config/baseUrl";
import { getStore } from "./utils";

export const setStatusButton = (status) => {
  const state = status ? status.toString() : "";
  switch (state) {
    case "1":
      return "取消申请";
    case "2":
      return "取消申请 ";
    case "3":
      return "查看详情";
    case "4":
      return "评价";
    case "5":
      return "检测报告";
    case "-1":
      return "撤销申请";
    case "-2":
      return "查看详情";
    case "-3":
      return "查看详情";

    default:
      return "";
  }
};

export const setStatus = (status) => {
  const state = status ? status.toString() : "";
  switch (state) {
    case "1":
      return "待审核";
    case "2":
      return "待上门";
    case "3":
      return "进行中";
    case "4":
      return "待评价";
    case "5":
      return "已完成";
    case "-1":
      return "待上门";
    case "-2":
      return "已取消";
    case "-3":
      return "拒接申请";

    default:
      return "";
      break;
  }
};

export const showToast = (text) => {
  Taro.showToast({
    title: text,
    icon: "none",
  });
};

export const downReport = (order) => {
  if (order.testReport) {
    const preurl = `${baseUrl}/api/common/report/download/${order.orderNum}`;
    let filePath = "";
    Taro.setClipboardData({
      data: order.downloadUrl,
    }).then(() => {
      showToast("复制成功，请在浏览器中打开并下载");
      return;
    });
    // Taro.showLoading({
    //   title: "",
    // });
    // Taro.downloadFile({
    //   // 示例 url，并非真实存在
    //   url: preurl,
    //   header: {
    //     Authorization: `Bearer ${getStore("userToken")}`,
    //   },
    //   success: (res) => {
    //     filePath = res.tempFilePath;
    //     Taro.saveFile({
    //       tempFilePath: filePath,
    //       success: () => {
    //         showToast("下载成功");
    //       },
    //     });
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     Taro.hideLoading();
    //   },
    // });
  } else {
    Taro.navigateTo({
      url: "/pages/report/index",
    });
  }
};

export const formatDatatoNull = (data) => {
  const list = JSON.parse(JSON.stringify(data));
  Object.keys(list).forEach((itemKey) => {
    list[itemKey] = list[itemKey] === null ? "" : list[itemKey];
  });
  return list;
};

export const preViewReport = (order) => {
  if (order.testReport) {
    const preurl = `${baseUrl}/api/common/report/download/${order.orderNum}`;
    Taro.downloadFile({
      url: preurl,
      header: {
        Authorization: `Bearer ${getStore("userToken")}`,
      },
      success(res) {
        console.log(res);
        const Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
        Taro.openDocument({
          filePath: Path,
          fileType: "pdf",
          success(respone) {
            console.log("res", respone);
          },
        });
      },
    });
  } else {
    Taro.navigateTo({
      url: "/pages/report/index",
    });
  }
};

export const sendReportEmail = (order) => {
  if (order.testReport) {
    const orderId = order.id;
    if (orderId) {
      sendEmail({ orderId })
        .then((res) => {
          showToast("发送成功");
        })
        .catch((err) => {
          showToast(err.message);
        });
    }
  } else {
    Taro.navigateTo({
      url: "/pages/report/index",
    });
  }
};
