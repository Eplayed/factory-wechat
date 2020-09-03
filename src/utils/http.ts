import Taro from "@tarojs/taro";
import { getStore, clearUserInfo } from "./utils";
import { baseUrl } from "../config/baseUrl";

export { baseUrl };

const interceptor = function (chain) {
  const requestParams = chain.requestParams;
  // const { method, data, url } = requestParams;
  Taro.showLoading({
    title: "请求中...",
  });

  return chain.proceed(requestParams).then((res) => {
    const data = res.data;
    Taro.hideLoading();

    if (data.code == 'Unauthorized') {
      Taro.showToast({
        title: data.message,
        icon: "none",
      })
      console.log('Unauthorized', res)
      clearUserInfo()
      Taro.navigateTo({
        url: "/pages/login/index",
      });
      return data
    }
    if (data.code === "OK") {
      return data;
    } else {
      Taro.showToast({
        title: data.message,
        icon: "none",
      });
      return data;
    }
  });
};

Taro.addInterceptor(interceptor);

const request = ({ url, data = null, method }) => {
  const token = getStore("userToken");
  return Taro.request({
    url: baseUrl + url,
    data,
    method,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  });
};
const request_json = ({ url, data = null, method }) => {
  const token = getStore("userToken");
  const apiUrl = url.indexOf("http") > -1 ? url : baseUrl + url;
  return Taro.request({
    url: apiUrl,
    data,
    method,
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const ajax = request;

export { ajax, request_json };
