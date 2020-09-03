import { ajax, request_json } from "@/utils/http";
// import Taro from "@tarojs/taro";

export const testToken = (data) => {
  return request_json({
    url: `/api/passport/login/test/${data.userName}`,
    data,
    method: "post",
  });
};

export const fetchBanner = () => {
  return request_json({
    url: "/api/common/banner/list",
    method: "get",
  });
};

export const orderSubmit = (data) => {
  return request_json({
    url: "/api/u/user/order/submit/apply",
    data,
    method: "post",
  });
};
