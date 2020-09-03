// let url = 'https://xcx.joywaygym.com'; //生产服
// const url = "http://ip-29-zhinengchen-app.coralcodes.com"; //测试服
// const url = "http://ip-30-ica-api.coralcodes.com";
// const url = "https://user.pq-ai.online";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://ip-29-zhinengchen-app.coralcodes.com"
    : "https://user.pq-ai.online";

export const baseUrl = BASE_URL;

const H5_url = "http://localhost:3002"; //内嵌H5页面的域名

export const WebView_domain = H5_url;

// let image_url = 'https://image.xxxxx.com'; //小程序内引用图片的路径
const image_url = "http://file.o-sheepps.com"; //小程序内引用图片的路径
export const image_domain = image_url;
export const loginVideo = "http://file.o-sheepps.com/login_video.mp4?id=1";

// 版本信息管理
const versionList = [
  {
    code: "0.1.3 ",
    describe: "init",
    user: "yanan.li",
  },
];

export const printVersion = () => {
  const version = versionList[0];
  console.groupCollapsed(
    `%c version -- ${version.code}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.info(
    `%c describe -- ${version.describe}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.info(
    `%c user -- ${version.user}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.groupEnd();
};
