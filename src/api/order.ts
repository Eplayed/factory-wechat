import { ajax, request_json } from "@/utils/http";

export const fetchOrderList = (data) => {
  return request_json({
    url: "/api/u/user/order/list/",
    method: "get",
    data,
  });
};

export const fetchOrderDetail = (data) => {
  return request_json({
    url: `/api/u/user/order/info/${data.orderId}`,
    method: "get",
    data,
  });
};

export const cancelOrder = (data) => {
  return request_json({
    url: "/api/u/user/order/cancel",
    method: "post",
    data,
  });
};

export const undoCancelOrder = (data) => {
  return request_json({
    url: `/api/u/user/order/undo/cancel/${data.orderId}`,
    method: "post",
    data,
  });
};

export const evaluateOrder = (data) => {
  return request_json({
    url: "/api/u/user/order/evaluate",
    data,
    method: "post",

  });
};

export const sendEmail = (data) => {
  return request_json({
    url: `/api/common/send/email/${data.orderId}`,
    data,
    method: "get",

  });
}

export const startDetection = (data) => {
  return request_json({
    url: `/api/u/user/order/start/detection/${data.orderId}`,
    data,
    method: "post",

  });
}
