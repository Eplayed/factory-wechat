import { ajax, request_json } from "@/utils/http";
import Taro from "@tarojs/taro";
import { setStore } from "@/utils/utils";

const requestLogin = (data) => {
  return request_json({
    url: "/api/passport/wechatCallback",
    data,
    method: "post",
  });
};

export const wx_login = (e) => {
  const detail = e.detail;
  const {
    encryptedData,
    iv,
    userInfo: { nickName, avatarUrl },
  } = e.detail;
  const userInfo = detail.userInfo;
  return new Promise((resolve, reject) => {
    Taro.login().then((login) => {
      setStore("userInfo", userInfo);
      // const avatar = userInfo.avatarUrl;
      // const nickName = userInfo.nickName;

      const jsCode = login.code;
      requestLogin({
        encryptedData,
        jsCode,
        iv,
        avatar: avatarUrl,
        nickName,
      }).then((res: any) => {
        if (res.code === "OK") {
          //在这里存储Token
          setStore("userToken", res.data);
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  });
};

export const getUserInfo = () => {
  return ajax({
    url: "/api/userInfo/baseInfo",
    method: "get",
  });
};

export const setUserInfo = () => {
  return ajax({
    url: "/api/u/user/info",
    method: "get",
  });
};
